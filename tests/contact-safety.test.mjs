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

const appSources = [...walk(join(root, "components")), ...walk(join(root, "app"))];
const bundle = appSources.map((path) => readFileSync(path, "utf8")).join("\n");
const contact = readFileSync(join(root, "components/ContactSection.tsx"), "utf8");
const footer = readFileSync(join(root, "components/Footer.tsx"), "utf8");

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
  assert.doesNotMatch(contact, /type=["']submit["']/);
  assert.doesNotMatch(contact, /setSubmitted/);
  assert.doesNotMatch(contact, /be in touch/);
  assert.doesNotMatch(contact, /fetch\s*\(/);
  assert.doesNotMatch(contact, /action\s*=/);
  assert.match(contact, /type=["']button["']/);
});

test("unresolved channels show the exact awaiting label", () => {
  const label = "Awaiting client input";
  assert.equal(contact.split(label).length - 1, 2);
  assert.equal(footer.split(label).length - 1, 1);
});
