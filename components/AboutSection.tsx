import Image from "next/image";
import AwaitingLabel from "@/components/AwaitingLabel";
import MediaSlot from "@/components/MediaSlot";

const benefits = [
  {
    title: "Breeding standard",
    image: "/Images/Info-Section-Leaf.webp",
    pending: true,
    body: "",
  },
  {
    title: "Community first",
    image: "/Images/Info-Section-community.webp",
    pending: false,
    body: "We're building a tribe, not just a business.",
  },
  {
    title: "Based in Pretoria",
    image: "/Images/Info-Section-Location.webp",
    pending: false,
    body: "Pretoria, South Africa.",
  },
];

const story = [
  "We're a father and son who love animals and nature. We breed reptiles with care because we believe these incredible creatures deserve to be in homes where they're genuinely appreciated.",
  "But what really matters to us is building something together. A tribe of people who genuinely care about these animals and want to learn and connect with others who do too.",
  "These aren't just animals. They're part of our family, and we want to help you welcome them into yours.",
];

export default function AboutSection() {
  return (
    <section id="story" aria-labelledby="story-heading" className="scroll-mt-24 border-t border-line bg-surface">
      <div className="shell py-16 lg:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story-heading" className="display text-4xl sm:text-5xl">
              Bred with care. Built for community.
            </h2>
            <div className="mt-6 space-y-4 text-body">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a className="text-link mt-6" href="#collection">
              Explore the collection
            </a>
          </div>
          <MediaSlot />
        </div>
        <ul className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title}>
              <div aria-hidden="true" className="relative mb-4 h-16 w-16">
                <Image
                  src={benefit.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain object-left"
                />
              </div>
              <h3 className="font-display text-2xl text-ink">{benefit.title}</h3>
              {benefit.pending ? (
                <p className="mt-2">
                  <AwaitingLabel />
                </p>
              ) : (
                <p className="mt-2 text-body">{benefit.body}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
