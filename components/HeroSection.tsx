import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="shell grid items-center gap-10 py-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className="max-w-xl">
        <p className="eyebrow">Pretoria, South Africa</p>
        <h1 className="display text-[2.75rem] sm:text-6xl lg:text-[4.75rem]">
          <span className="block text-body">Where reptiles</span>
          <span className="block">find their tribe</span>
        </h1>
        <p className="mt-6 max-w-md text-body">
          A proposal for geckos, chameleons, iguanas, and other exotic reptiles.
          Names on this page are examples, not a stock list.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-primary" href="#collection">
            Explore the collection
          </a>
          <a className="btn btn-secondary" href="#story">
            Our story
          </a>
        </div>
      </div>
      <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="relative aspect-video">
          <Image
            src="/Images/Hero-Reptile.webp"
            alt="Stylized green chameleon used as proposal artwork"
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-contain object-center p-2"
          />
        </div>
        <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">
          Proposal reference
        </figcaption>
      </figure>
    </section>
  );
}
