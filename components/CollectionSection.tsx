import AwaitingLabel from "@/components/AwaitingLabel";
import MediaSlot from "@/components/MediaSlot";
import { species } from "@/lib/species";

export default function CollectionSection() {
  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="scroll-mt-24 border-t border-line"
    >
      <div className="shell py-16 lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Collection</p>
          <h2 id="collection-heading" className="display text-4xl sm:text-5xl">
            Meet the tribe
          </h2>
          <p className="mt-4 text-body">
            Proposal examples. These are not confirmed stock, prices, or availability.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {species.map((animal) => (
            <li key={animal.id} className="card">
              <MediaSlot plain />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {animal.tag}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">{animal.name}</h3>
                <p className="text-sm italic text-body">{animal.latin}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Price</p>
                <p className="text-sm">
                  <AwaitingLabel />
                </p>
                <a className="text-link mt-auto" href="#contact">
                  Enquire
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
