import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const path = join(dir, name);
    const info = statSync(path);
    if (info.isDirectory()) files.push(...walk(path));
    else if (/\.(tsx|ts|jsx|js|mjs|css)$/.test(name)) files.push(path);
  }
  return files;
}

const appSources = [...walk(join(root, "components")), ...walk(join(root, "app")), ...walk(join(root, "lib"))];
const bundle = appSources.map((path) => readFileSync(path, "utf8")).join("\n");
const contact = readFileSync(join(root, "components/ContactSection.tsx"), "utf8");
const footer = readFileSync(join(root, "components/Footer.tsx"), "utf8");
const label = readFileSync(join(root, "components/AwaitingLabel.tsx"), "utf8");
const header = readFileSync(join(root, "components/SiteHeader.tsx"), "utf8");
const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");

test("unresolved channels are not live destinations", () => {
  assert.doesNotMatch(bundle, /wa\.me/);
  assert.doesNotMatch(bundle, /mailto:/);
  assert.doesNotMatch(bundle, /facebook\.com/);
  assert.doesNotMatch(bundle, /placeholder@/);
  assert.doesNotMatch(contact, /<a[\s>]/);
  assert.doesNotMatch(contact, /href\s*=/);
  assert.doesNotMatch(footer, /https?:\/\//);
  assert.doesNotMatch(footer, /mailto:/);
});

test("contact UI cannot submit or claim an enquiry was sent", () => {
  assert.doesNotMatch(contact, /<form[\s>]/);
  assert.doesNotMatch(contact, /<input[\s>]/);
  assert.doesNotMatch(contact, /<textarea[\s>]/);
  assert.doesNotMatch(contact, /type=["']submit["']/);
  assert.doesNotMatch(contact, /setSubmitted/);
  assert.doesNotMatch(contact, /be in touch/);
  assert.doesNotMatch(contact, /fetch\s*\(/);
  assert.doesNotMatch(contact, /action\s*=/);
  assert.match(contact, /does not send an enquiry/);
});

test("missing content uses the exact awaiting label", () => {
  assert.match(label, />Awaiting client input</);
  assert.doesNotMatch(bundle, /coming soon|Photo pending|Details awaiting|24 hours|wild caught|From R/i);
  for (const file of ["AboutSection.tsx", "CollectionSection.tsx", "ContactSection.tsx", "Footer.tsx"]) {
    const source = readFileSync(join(root, "components", file), "utf8");
    assert.match(source, /AwaitingLabel/);
  }
});

test("editorial structure is present in source", () => {
  assert.match(header, /aria-expanded/);
  assert.match(header, /Escape/);
  assert.match(header, /#story/);
  assert.match(header, /#collection/);
  assert.match(header, /#contact/);
  assert.match(layout, /Source_Sans_3/);
  assert.match(layout, /Fraunces/);
  assert.match(layout, /Skip to content/);
  assert.doesNotMatch(bundle, /requestAnimationFrame/);
  assert.doesNotMatch(bundle, /rotateY/);
  assert.match(readFileSync(join(root, "app/globals.css"), "utf8"), /#0b1210/);
  assert.match(readFileSync(join(root, "app/globals.css"), "utf8"), /#d4894a/);
});
