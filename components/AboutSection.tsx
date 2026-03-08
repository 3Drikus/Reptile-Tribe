"use client";

import Image from "next/image";

const benefits = [
  {
    icon: (
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <Image src="/Images/Info-Section-Leaf.webp" alt="" fill style={{ objectFit: "contain" }} />
      </div>
    ),
    title: "Ethically Bred",
    description:
      "Every animal is bred with care, never wild caught. We raise healthy, well-adjusted reptiles in proper conditions.",
  },
  {
    icon: (
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <Image src="/Images/Info-Section-community.webp" alt="" fill style={{ objectFit: "contain" }} />
      </div>
    ),
    title: "Community First",
    description:
      "We're building a tribe not just a business. Get guidance, share experiences, and connect with fellow enthusiasts.",
  },
  {
    icon: (
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <Image src="/Images/Info-Section-Location.webp" alt="" fill style={{ objectFit: "contain" }} />
      </div>
    ),
    title: "Based in Pretoria",
    description:
      "Visit us in Pretoria or enquire online. We're real people who are always happy to chat about our animals.",
  },
];

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
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
        {/* Two-column layout */}
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={{ gap: "80px" }}
        >
          {/* Left: text */}
          <div className="flex-1 min-w-0">
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
              Our Story
            </p>

            <h2
              id="about-heading"
              style={{
                margin: "16px 0 0",
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 700,
                color: "#f0ebe0",
                lineHeight: 1.1,
              }}
            >
              Bred With Care.{" "}
              <br className="hidden md:block" />
              Built For Community.
            </h2>

            <div style={{ marginTop: "32px" }}>
              {[
                "We're a father and son who love animals and nature. We breed reptiles with care because we believe these incredible creatures deserve to be in homes where they're genuinely appreciated.",
                "But what really matters to us is building something together. A tribe of people who genuinely care about these animals and want to learn and connect with others who do too.",
                "These aren't just animals. They're part of our family, and we want to help you welcome them into yours.",
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : "16px 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    fontWeight: 300,
                    color: "#8a9e82",
                    lineHeight: 1.8,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <a
              href="#collection"
              style={{
                display: "inline-block",
                marginTop: "40px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#c17f3a",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
              }}
            >
              Explore Our Collection →
            </a>
          </div>

          {/* Right: image placeholder */}
          <div
            className="flex-1 min-w-0"
            style={{
              minHeight: "480px",
              height: "100%",
            }}
          >
            <div
              aria-label="Photo coming soon"
              className="w-full h-[280px] md:h-full"
              style={{
                minHeight: "480px",
                background: "linear-gradient(160deg, #1e3a1e 0%, #0f1a0e 100%)",
                border: "1px solid #2a3d28",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  color: "#8a9e82",
                  opacity: 0.4,
                }}
              >
                [ Photo coming soon ]
              </span>
            </div>
          </div>
        </div>

        {/* Benefit cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ marginTop: "80px", gap: "24px" }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              style={{
                padding: "16px 24px 24px",
              }}
            >
              <div style={{ height: 140, display: "flex", alignItems: "flex-start" }}>
                {b.icon}
              </div>
              <h3
                style={{
                  margin: "20px 0 0",
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#f0ebe0",
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  margin: "8px 0 0",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "#8a9e82",
                  lineHeight: 1.6,
                }}
              >
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
