const noiseDataUri =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0f1a0e 0%, #1a3018 40%, #162114 70%, #0f1a0e 100%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: noiseDataUri,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.03,
        }}
      />

      {/* Navigation */}
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

      {/* Main heading — centred in the space below the nav */}
      <div
        className="absolute left-0 right-0 flex items-center pl-6 md:pl-16"
        style={{ top: "80px", bottom: 0 }}
      >
        <div>
          <h1 style={{ margin: 0 }}>
            <span
              className="block text-[48px] md:text-[96px]"
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
              className="block text-[48px] md:text-[96px]"
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
        </div>
      </div>

      {/* Bottom section — horizontal rule + bar */}
      <div className="absolute left-0 right-0 bottom-0">
        {/* Full-width divider */}
        <div
          aria-hidden="true"
          style={{ height: "1px", backgroundColor: "#2a3d28" }}
        />

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-12 gap-6 md:gap-0"
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          {/* Left: featured species boxes */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {["Gecko", "Chameleon", "Iguana"].map((species) => (
                <div
                  key={species}
                  aria-label={`${species} preview`}
                  style={{
                    width: "72px",
                    height: "80px",
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
    </section>
  );
}
