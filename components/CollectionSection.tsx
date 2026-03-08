"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const species = [
  {
    id: "veiled-chameleon",
    name: "Veiled Chameleon",
    latin: "Chamaeleo calyptratus",
    price: "From R2,500",
    tag: "Chameleon",
    gradient: "linear-gradient(160deg, #1e3a1e 0%, #0d1f0d 100%)",
  },
  {
    id: "leopard-gecko",
    name: "Leopard Gecko",
    latin: "Eublepharis macularius",
    price: "From R800",
    tag: "Gecko",
    gradient: "linear-gradient(160deg, #2a3018 0%, #0f1a0e 100%)",
  },
  {
    id: "crested-gecko",
    name: "Crested Gecko",
    latin: "Correlophus ciliatus",
    price: "From R1,200",
    tag: "Gecko",
    gradient: "linear-gradient(160deg, #1a2e1a 0%, #111a0e 100%)",
  },
  {
    id: "green-iguana",
    name: "Green Iguana",
    latin: "Iguana iguana",
    price: "From R1,800",
    tag: "Iguana",
    gradient: "linear-gradient(160deg, #162814 0%, #0e1a0e 100%)",
  },
  {
    id: "panther-chameleon",
    name: "Panther Chameleon",
    latin: "Furcifer pardalis",
    price: "From R4,500",
    tag: "Chameleon",
    gradient: "linear-gradient(160deg, #22321a 0%, #0f1a0d 100%)",
  },
  {
    id: "blue-tongued-skink",
    name: "Blue-tongued Skink",
    latin: "Tiliqua scincoides",
    price: "From R3,200",
    tag: "Skink",
    gradient: "linear-gradient(160deg, #182818 0%, #0d1810 100%)",
  },
];

const AUTOPLAY_MS = 3500;

export default function CollectionSection() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // fractional steps (e.g. 0.4 = 40% toward next)
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = species.length;

  const go = useCallback(
    (dir: 1 | -1) => setActive((prev) => (prev + dir + total) % total),
    [total]
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go(1), AUTOPLAY_MS);
  }, [go]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, resetTimer]);

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    draggingRef.current = true;
    setDragging(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleDragMove = (clientX: number) => {
    if (!draggingRef.current) return;
    const delta = dragStartX.current - clientX;
    const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
    setDragOffset(delta / (containerWidth * 0.52));
  };

  const handleDragEnd = (clientX: number) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const delta = dragStartX.current - clientX;
    const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
    const steps = Math.round(delta / (containerWidth * 0.52));

    // Step 1: re-enable transitions (setDragging false), but keep dragOffset in place
    // so the browser has a painted starting point for the snap animation.
    setDragging(false);

    // Step 2: after two frames (ensures React flushed step 1 and browser painted it),
    // snap to the target — CSS transition animates the movement.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (steps !== 0) {
          setActive((prev) => ((prev + steps) % total + total) % total);
        }
        setDragOffset(0);
        resetTimer();
      });
    });
  };

  return (
    <section
      aria-labelledby="collection-heading"
      style={{ background: "linear-gradient(135deg, #0f1a0e 0%, #1a3018 40%, #162114 70%, #0f1a0e 100%)", overflow: "hidden" }}
      className="py-20 md:py-[120px]"
    >
      {/* Header */}
      <div className="px-6 md:px-16" style={{ marginBottom: "48px" }}>
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
          Our Collection
        </p>
        <h2
          id="collection-heading"
          style={{
            margin: "8px 0 0",
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 700,
            color: "#f0ebe0",
            lineHeight: 1.05,
          }}
        >
          Meet The Tribe
        </h2>
      </div>

      {/* Carousel track */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "520px",
          perspective: "1200px",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); handleDragMove(e.touches[0].clientX); }}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        {species.map((s, i) => {
          const offset = ((i - active + total) % total + total) % total;
          const norm = offset > total / 2 ? offset - total : offset;
          // Continuous float position including live drag
          const d = norm - dragOffset;

          const isActive = Math.abs(d) < 0.5;
          const isVisible = Math.abs(d) <= 2.5;

          if (!isVisible) return null;

          const translateX = d * 52;
          const translateZ = isActive ? 80 : -120 * Math.abs(d);
          const rotateY = d * -18;
          const scale = isActive ? 1 : Math.max(0.4, 0.78 - Math.abs(d) * 0.06);
          const opacity = Math.max(0, isActive ? 1 : 0.55 - Math.abs(d) * 0.1);
          const zIndex = isActive ? 10 : Math.max(1, Math.round(5 - Math.abs(d)));

          return (
            <div
              key={s.id}
              onClick={() => { if (!dragging) setActive(i); }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "min(420px, 72vw)",
                height: "480px",
                borderRadius: "16px",
                overflow: "hidden",
                border: isActive ? "1px solid rgba(193,127,58,0.5)" : "1px solid #2a3d28",
                background: s.gradient,
                cursor: isActive ? "default" : "pointer",
                zIndex,
                opacity,
                transform: `
                  translate(-50%, -50%)
                  translateX(${translateX}%)
                  translateZ(${translateZ}px)
                  rotateY(${rotateY}deg)
                  scale(${scale})
                `,
                // No transition while dragging → cards track cursor exactly.
                // Transition re-enabled on release → smooth snap animation.
                transition: dragging
                  ? "none"
                  : "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.6s ease, border-color 0.4s ease",
                boxShadow: isActive
                  ? "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(193,127,58,0.2)"
                  : "0 10px 30px rgba(0,0,0,0.3)",
                userSelect: "none",
              }}
            >
              {/* Bottom gradient overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(5,12,5,0.97) 0%, rgba(5,12,5,0.4) 50%, transparent 75%)",
                  zIndex: 1,
                }}
              />

              {/* Tag */}
              <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "#c17f3a",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    backgroundColor: "rgba(193,127,58,0.12)",
                    border: "1px solid rgba(193,127,58,0.35)",
                    borderRadius: "100px",
                    padding: "4px 12px",
                  }}
                >
                  {s.tag}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "28px",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#c17f3a",
                    marginBottom: "16px",
                    width: isActive ? "48px" : "0px",
                    transition: "width 0.5s ease 0.2s",
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#f0ebe0",
                    lineHeight: 1.2,
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "#8a9e82",
                    fontStyle: "italic",
                  }}
                >
                  {s.latin}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#c17f3a",
                    }}
                  >
                    {s.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      color: "#8a9e82",
                    }}
                  >
                    Enquire →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          marginTop: "40px",
        }}
      >
        <button
          type="button"
          aria-label="Previous"
          onClick={() => { go(-1); resetTimer(); }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #2a3d28",
            backgroundColor: "transparent",
            color: "#8a9e82",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c17f3a"; e.currentTarget.style.color = "#c17f3a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a3d28"; e.currentTarget.style.color = "#8a9e82"; }}
        >
          ←
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {species.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { setActive(i); resetTimer(); }}
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                borderRadius: "100px",
                border: "none",
                backgroundColor: i === active ? "#c17f3a" : "#2a3d28",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => { go(1); resetTimer(); }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #2a3d28",
            backgroundColor: "transparent",
            color: "#8a9e82",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c17f3a"; e.currentTarget.style.color = "#c17f3a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a3d28"; e.currentTarget.style.color = "#8a9e82"; }}
        >
          →
        </button>
      </div>
    </section>
  );
}
