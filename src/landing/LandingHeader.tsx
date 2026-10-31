import { Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GlimmerlockLogo } from "../components/GlimmerlockLogo";
import { GITHUB_URL, NAV_LINKS } from "./content";

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-ink-950/72 backdrop-blur-2xl">
      <div className="mx-auto flex h-[74px] w-full max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href="/"
          aria-label="Glimmerlock home"
          className="flex shrink-0 items-center"
        >
          <GlimmerlockLogo className="h-9 w-36 sm:h-10 sm:w-40" />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-white/55 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Glimmerlock on GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/55 transition hover:border-brand-300/30 hover:bg-white/[0.06] hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="/app"
            className="glimmer-primary-cta hidden px-4 py-2.5 sm:inline-flex"
          >
            Open app
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/65 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] bg-ink-950/96 px-5 py-4 lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-[90rem] flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/app"
              onClick={() => setOpen(false)}
              className="glimmer-primary-cta mt-2 text-center"
            >
              Open app
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
