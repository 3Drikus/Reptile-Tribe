"use client";

import { useState } from "react";
import { MessageCircle, Mail, Facebook } from "lucide-react";

const contactMethods = [
  {
    icon: <MessageCircle size={24} color="#c17f3a" />,
    title: "WhatsApp",
    subtitle: "Chat with us directly",
    buttonLabel: "Open WhatsApp",
    href: "https://wa.me/placeholder",
  },
  {
    icon: <Mail size={24} color="#c17f3a" />,
    title: "Email Us",
    subtitle: "We reply within 24 hours",
    buttonLabel: "Send Email",
    href: "mailto:placeholder@reptile-tribe.com",
  },
  {
    icon: <Facebook size={24} color="#c17f3a" />,
    title: "Facebook",
    subtitle: "Follow our community",
    buttonLabel: "Visit Page",
    href: "https://facebook.com/placeholder",
  },
];

const inputBase: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#162114",
  border: "1px solid #2a3d28",
  borderRadius: "8px",
  padding: "14px 16px",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "14px",
  color: "#f0ebe0",
  outline: "none",
  boxSizing: "border-box",
};

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === field ? "#c17f3a" : "#2a3d28",
    transition: "border-color 0.2s",
  });

  return (
    <section
      aria-labelledby="contact-heading"
      style={{ backgroundColor: "#0f1a0e" }}
      className="py-20 md:py-[120px]"
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5.3vw, 64px)",
          paddingRight: "clamp(24px, 5.3vw, 64px)",
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: "64px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-dm-sans)",
              fontSize: "11px",
              color: "#8a9e82",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 700,
              color: "#f0ebe0",
              lineHeight: 1.1,
            }}
          >
            Join The Tribe
          </h2>
          <p
            style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "16px",
              fontWeight: 300,
              color: "#8a9e82",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            Have a question about one of our animals? Want to know more about
            availability? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className="flex flex-col md:flex-row"
          style={{ gap: "80px", alignItems: "flex-start" }}
        >
          {/* Left: contact form */}
          <div className="flex-1 min-w-0 w-full">
            {submitted ? (
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "16px",
                  color: "#8a9e82",
                  lineHeight: 1.7,
                }}
              >
                Thanks! We&apos;ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    aria-label="Your name"
                    style={focusStyle("name")}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    aria-label="Your email"
                    style={focusStyle("email")}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                  <textarea
                    placeholder="Tell us about what you're looking for..."
                    required
                    aria-label="Message"
                    style={{
                      ...focusStyle("message"),
                      height: "120px",
                      resize: "none",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    backgroundColor: "#c17f3a",
                    color: "#0f1a0e",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "14px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: contact info */}
          <div className="flex-1 min-w-0 w-full">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {contactMethods.map((method) => (
                <div
                  key={method.title}
                  style={{
                    backgroundColor: "#162114",
                    border: "1px solid #2a3d28",
                    borderRadius: "12px",
                    padding: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ flexShrink: 0 }}>{method.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#f0ebe0",
                      }}
                    >
                      {method.title}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "#8a9e82",
                      }}
                    >
                      {method.subtitle}
                    </p>
                  </div>
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#8a9e82",
                      backgroundColor: "transparent",
                      border: "1px solid #2a3d28",
                      borderRadius: "100px",
                      padding: "6px 14px",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#c17f3a";
                      e.currentTarget.style.color = "#c17f3a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#2a3d28";
                      e.currentTarget.style.color = "#8a9e82";
                    }}
                  >
                    {method.buttonLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
