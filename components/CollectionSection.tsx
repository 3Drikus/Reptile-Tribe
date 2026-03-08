"use client";

const species = [
  {
    id: "veiled-chameleon",
    name: "Veiled Chameleon",
    latin: "Chamaeleo calyptratus",
    price: "From R2,500",
  },
  {
    id: "leopard-gecko",
    name: "Leopard Gecko",
    latin: "Eublepharis macularius",
    price: "From R800",
  },
  {
    id: "crested-gecko",
    name: "Crested Gecko",
    latin: "Correlophus ciliatus",
    price: "From R1,200",
  },
  {
    id: "green-iguana",
    name: "Green Iguana",
    latin: "Iguana iguana",
    price: "From R1,800",
  },
  {
    id: "panther-chameleon",
    name: "Panther Chameleon",
    latin: "Furcifer pardalis",
    price: "From R4,500",
  },
  {
    id: "blue-tongued-skink",
    name: "Blue-tongued Skink",
    latin: "Tiliqua scincoides",
    price: "From R3,200",
  },
];

interface CardProps {
  name: string;
  latin: string;
  price: string;
}

function Card({ name, latin, price }: CardProps) {
  return (
    <article
      style={{
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        border: "1px solid #2a3d28",
        background: "linear-gradient(160deg, #1e3a1e 0%, #0f1a0e 100%)",
        transition: "transform 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.borderColor = "#c17f3a";
        (e.currentTarget.querySelector(".top-line") as HTMLElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.borderColor = "#2a3d28";
        (e.currentTarget.querySelector(".top-line") as HTMLElement).style.opacity = "0";
      }}
    >
      {/* Top accent line */}
      <div
        className="top-line"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "#c17f3a",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      />

      {/* Bottom content overlay */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "24px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(15,26,14,0.95) 100%)",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-fraunces)",
            fontSize: "22px",
            fontWeight: 600,
            color: "#f0ebe0",
            lineHeight: 1.2,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "12px",
            fontWeight: 300,
            color: "#8a9e82",
          }}
        >
          {latin}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "13px",
            fontWeight: 400,
            color: "#c17f3a",
          }}
        >
          {price}
        </p>
      </div>
    </article>
  );
}

export default function CollectionSection() {
  return (
    <section
      aria-labelledby="collection-heading"
      style={{ backgroundColor: "#0f1a0e" }}
      className="py-20 md:py-[120px]"
    >
      {/* Header */}
      <div className="px-6 md:px-12" style={{ marginBottom: "48px" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            fontWeight: 400,
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

      {/* Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        className="px-6 md:px-16"
      >
        <div
          style={{ gap: "16px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          {species.map((s) => (
            <div key={s.id} className="h-[320px] md:h-[420px]">
              <Card name={s.name} latin={s.latin} price={s.price} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
