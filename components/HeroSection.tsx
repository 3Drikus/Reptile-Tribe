"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const noiseDataUri =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const DOT_SPACING = 24;
const DOT_RADIUS = 1;
const BASE_OPACITY = 0.15;
const GLOW_RADIUS = 150;
// #8a9e82
const BASE = { r: 0x8a, g: 0x9e, b: 0x82 };
// #c17f3a
const GLOW = { r: 0xc1, g: 0x7f, b: 0x3a };

// Physics
const ATTRACT_STRENGTH = 0.35; // pull force towards cursor
const SPRING_K = 0.12;         // return-to-origin stiffness
const DAMPING = 0.88;          // velocity friction per frame
const MAX_DISPLACEMENT = 5;    // max px a dot can drift from grid

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Float32Array: 4 values per dot — ox, oy, vx, vy
  const dotsRef = useRef<Float32Array>(new Float32Array(0));

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mouse position in section-local coords; start off-screen so no glow on load
    const mouse = { x: -9999, y: -9999 };
    let rafId: number;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;
      const total = cols * rows;

      // Resize physics buffer if grid changed
      if (dotsRef.current.length !== total * 4) {
        dotsRef.current = new Float32Array(total * 4);
      }
      const dots = dotsRef.current;

      const glowCeiling = bottomRef.current
        ? canvas.height - bottomRef.current.offsetHeight
        : canvas.height;

      const hasMouse = mouse.x > -999;
      const glowDots: { x: number; y: number; ease: number }[] = [];

      // Pass 1 — update physics + draw all base dots in one path
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = c * DOT_SPACING;
          const gy = r * DOT_SPACING;
          if (gy >= glowCeiling) continue;

          const i = (r * cols + c) * 4;
          let ox = dots[i];
          let oy = dots[i + 1];
          let vx = dots[i + 2];
          let vy = dots[i + 3];

          const ax = gx + ox;
          const ay = gy + oy;

          // Attraction towards cursor
          if (hasMouse) {
            const dx = mouse.x - ax;
            const dy = mouse.y - ay;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < GLOW_RADIUS && dist > 0) {
              const t = 1 - dist / GLOW_RADIUS;
              const force = ATTRACT_STRENGTH * t * t;
              vx += (dx / dist) * force;
              vy += (dy / dist) * force;
            }
          }

          // Spring back + damping
          vx = (vx - SPRING_K * ox) * DAMPING;
          vy = (vy - SPRING_K * oy) * DAMPING;
          ox += vx;
          oy += vy;

          // Clamp max displacement
          const len = Math.sqrt(ox * ox + oy * oy);
          if (len > MAX_DISPLACEMENT) {
            ox = (ox / len) * MAX_DISPLACEMENT;
            oy = (oy / len) * MAX_DISPLACEMENT;
          }

          dots[i] = ox;
          dots[i + 1] = oy;
          dots[i + 2] = vx;
          dots[i + 3] = vy;

          ctx.moveTo(ax + DOT_RADIUS, ay);
          ctx.arc(ax, ay, DOT_RADIUS, 0, Math.PI * 2);

          // Queue glow pass
          if (hasMouse) {
            const dx = ax - mouse.x;
            const dy = ay - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < GLOW_RADIUS) {
              glowDots.push({ x: ax, y: ay, ease: (1 - dist / GLOW_RADIUS) ** 2 });
            }
          }
        }
      }
      ctx.fillStyle = `rgba(${BASE.r},${BASE.g},${BASE.b},${BASE_OPACITY})`;
      ctx.fill();

      // Pass 2 — glow dots
      for (const { x, y, ease } of glowDots) {
        const opacity = BASE_OPACITY + (0.8 - BASE_OPACITY) * ease;
        const rv = Math.round(BASE.r + (GLOW.r - BASE.r) * ease);
        const gv = Math.round(BASE.g + (GLOW.g - BASE.g) * ease);
        const bv = Math.round(BASE.b + (GLOW.b - BASE.b) * ease);
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgb(${rv},${gv},${bv})`;
        ctx.shadowBlur = 6 * ease;
        ctx.shadowColor = `rgba(${GLOW.r},${GLOW.g},${GLOW.b},${ease})`;
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS + ease * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f1a0e 0%, #1a3018 40%, #162114 70%, #0f1a0e 100%)",
      }}
    >
      {/* Background noise texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: noiseDataUri,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.03,
          zIndex: 0,
        }}
      />

      {/* Interactive dot grid canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Spacer for fixed nav — 64px on mobile matches nav height */}
      <div aria-hidden="true" style={{ height: "64px", flexShrink: 0 }} />

      {/* Content area — flex-1 means its bottom edge IS the divider line */}
      <div className="relative flex-1" style={{ minHeight: 0 }}>

        {/* Mobile: subtle background chameleon — centre-bottom, low opacity */}
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-0 pointer-events-none opacity-[0.15]"
          style={{ zIndex: 2 }}
        >
          <Image
            src="/Images/Hero-Reptile.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>

        {/* Desktop: chameleon image */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute pointer-events-none"
          style={{
            left: "50%",
            right: 0,
            top: "-80px",
            bottom: 0,
            zIndex: 2,
            transform: "scale(1.3) translateX(-310px)",
            transformOrigin: "left bottom",
          }}
        >
          <Image
            src="/Images/Hero-Reptile.webp"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-contain object-left-bottom"
          />
        </div>

        {/* Heading */}
        <div
          className="absolute inset-0 md:right-[50%] flex items-start md:items-center pt-[80px] md:pt-0 pl-6 md:pl-16"
          style={{ zIndex: 3 }}
        >
          <div>
            <h1 style={{ margin: 0 }}>
              <span
                className="block text-[40px] md:text-[96px]"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#f0ebe0",
                  opacity: 0.25,
                  lineHeight: 0.95,
                }}
              >
                Where Reptiles
              </span>
              <span
                className="block text-[40px] md:text-[96px]"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  fontStyle: "normal",
                  color: "#f0ebe0",
                  lineHeight: 0.95,
                }}
              >
                Find Their Tribe
              </span>
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: "16px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "12px",
                fontWeight: 400,
                color: "#8a9e82",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Pretoria, South Africa
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row"
              style={{ marginTop: "32px", gap: "12px" }}
            >
              <button
                type="button"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0f1a0e",
                  backgroundColor: "#c17f3a",
                  border: "none",
                  borderRadius: "100px",
                  padding: "12px 28px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Explore Animals →
              </button>
              <button
                type="button"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#f0ebe0",
                  backgroundColor: "transparent",
                  border: "1px solid #2a3d28",
                  borderRadius: "100px",
                  padding: "12px 28px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div ref={bottomRef} style={{ flexShrink: 0, zIndex: 3, position: "relative" }}>
        {/* Full-width divider */}
        <div
          aria-hidden="true"
          style={{ height: "1px", backgroundColor: "#2a3d28" }}
        />

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-12 gap-3 md:gap-0 pt-6 pb-6 md:pt-12 md:pb-12"
        >
          {/* Left: featured species boxes */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {["Gecko", "Chameleon", "Iguana"].map((species) => (
                <div
                  key={species}
                  aria-label={`${species} preview`}
                  style={{
                    width: "80px",
                    height: "96px",
                    backgroundColor: "#1a3018",
                    border: "1px solid #2a3d28",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                color: "#8a9e82",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Featured Species
            </span>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block self-stretch"
            style={{ width: "1px", backgroundColor: "#2a3d28" }}
          />

          {/* Right: collection info + CTA */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                color: "#8a9e82",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              OUR COLLECTION
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                fontWeight: 300,
                color: "#f0ebe0",
              }}
            >
              Geckos · Chameleons · Iguanas · and more
            </span>
            <button
              type="button"
              className="w-full md:w-auto"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0f1a0e",
                backgroundColor: "#c17f3a",
                border: "none",
                borderRadius: "100px",
                padding: "10px 24px",
                cursor: "pointer",
              }}
            >
              Explore Animals →
            </button>
          </div>
        </div>
      </div>

      {/* Navigation — fixed, always on top */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6"
        aria-label="Main navigation"
      >
        <span
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "18px",
            fontWeight: 500,
            color: "#f0ebe0",
            letterSpacing: "0.05em",
          }}
        >
          REPTILE TRIBE
        </span>

        <span
          className="hidden md:block"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            color: "#8a9e82",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          EST. 2024
        </span>

        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex flex-col justify-center gap-[5px] p-1"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className="block"
              style={{ width: "22px", height: "1.5px", backgroundColor: "#f0ebe0" }}
            />
          ))}
        </button>
      </nav>
    </section>
  );
}
