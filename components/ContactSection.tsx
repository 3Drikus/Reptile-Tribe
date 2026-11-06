import { Facebook, Mail, MessageCircle } from "lucide-react";
import AwaitingLabel from "@/components/AwaitingLabel";

const channels = [
  { title: "WhatsApp", icon: MessageCircle },
  { title: "Email", icon: Mail },
  { title: "Facebook", icon: Facebook },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-line bg-surface"
    >
      <div className="shell grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="display text-4xl sm:text-5xl">
            Join the tribe
          </h2>
          <p className="mt-6 text-body">
            This proposal does not send an enquiry. There is no form, and nothing
            you type here is delivered.
          </p>
          <p className="mt-4 text-body">
            The channels beside this note stay closed until a real destination is supplied.
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <li
                key={channel.title}
                className="flex items-center gap-4 rounded-2xl border border-line bg-canvas px-5 py-4"
              >
                <Icon size={24} className="shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink">{channel.title}</p>
                  <p className="text-sm">
                    <AwaitingLabel />
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
