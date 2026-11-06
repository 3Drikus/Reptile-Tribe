import { Facebook, Mail, MessageCircle } from "lucide-react";
import AwaitingLabel from "@/components/AwaitingLabel";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#story", label: "Story" },
  { href: "#collection", label: "Collection" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { title: "WhatsApp", icon: MessageCircle },
  { title: "Facebook", icon: Facebook },
  { title: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl tracking-[0.12em] text-ink">REPTILE TRIBE</p>
            <p className="mt-3 text-body">Bred with care. Built for community.</p>
            <p className="text-sm text-muted">Pretoria, South Africa</p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow">Follow</p>
            <ul className="flex flex-col gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.title} className="flex items-start gap-3">
                    <Icon size={24} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      <span className="block font-medium text-ink">{social.title}</span>
                      <span className="text-sm">
                        <AwaitingLabel />
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-sm text-muted">Reptile Tribe</p>
      </div>
    </footer>
  );
}
