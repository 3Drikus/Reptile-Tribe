"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const links = [
  { href: "#story", label: "Story" },
  { href: "#collection", label: "Collection" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = panel
      ? [...panel.querySelectorAll<HTMLElement>("a[href], button")]
      : [];
    focusable[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-line bg-canvas">
      <div className="shell flex h-16 items-center gap-3">
        <a href="#top" className="font-display text-[15px] tracking-[0.14em] text-ink no-underline">
          REPTILE TRIBE
        </a>
        <p className="chip shrink-0">Proposal preview</p>
        <nav className="ml-auto hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          ref={buttonRef}
          type="button"
          className="relative z-[70] ml-auto inline-flex size-11 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-canvas/80" onClick={() => close()} />
          <div
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-x-4 top-20 rounded-2xl border border-line bg-surface p-4"
          >
            <p id={titleId} className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-body">
              Menu
            </p>
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="menu-link"
                  onClick={() => close()}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button type="button" className="menu-link mt-2 w-full text-left text-body" onClick={() => close()}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
