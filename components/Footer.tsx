"use client";

import { MessageCircle, Facebook, Mail } from "lucide-react";

const navLinks = ["Home", "Our Story", "Collection", "Contact"];

const socialLinks = [
  { icon: <MessageCircle size={16} />, label: "WhatsApp", href: "https://wa.me/placeholder" },
  { icon: <Facebook size={16} />, label: "Facebook", href: "https://facebook.com/placeholder" },
  { icon: <Mail size={16} />, label: "Email Us", href: "mailto:placeholder@reptile-tribe.com" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a120a",
        borderTop: "1px solid #2a3d28",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5.3vw, 64px)",
          paddingRight: "clamp(24px, 5.3vw, 64px)",
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(40px, 4vw, 48px)",
        }}
      >
        {/* Three columns */}
        <div className="flex flex-col md:flex-row text-center md:text-left" style={{ gap: "32px" }}>

          {/* Left: brand */}
          <div className="flex-1">
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-fraunces)",
                fontSize: "20px",
                fontWeight: 600,
                color: "#f0ebe0",
              }}
            >
              REPTILE TRIBE
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 300,
                color: "#8a9e82",
              }}
            >
              Bred with care. Built for community.
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "12px",
                color: "#8a9e82",
                opacity: 0.6,
              }}
            >
              Pretoria, South Africa
            </p>
          </div>

          {/* Centre: navigation */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p
              style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                color: "#8a9e82",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Navigate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#8a9e82",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#f0ebe0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#8a9e82"; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right: social */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p
              style={{
                margin: "0 0 16px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                color: "#8a9e82",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Follow Us
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "#8a9e82",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#f0ebe0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#8a9e82"; }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          style={{ height: "1px", backgroundColor: "#2a3d28", marginTop: "32px" }}
          aria-hidden="true"
        />
        <div
          className="flex flex-col md:flex-row items-center justify-between text-center md:text-left"
          style={{ marginTop: "32px", gap: "8px" }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "#8a9e82",
              opacity: 0.5,
            }}
          >
            © 2024 Reptile Tribe. All rights reserved.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "#8a9e82",
              opacity: 0.5,
            }}
          >
            Pretoria, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
