import { Github } from "lucide-react";
import { GlimmerlockLogo } from "../components/GlimmerlockLogo";
import { ARC_STUDIO_URL, FOOTER_LINKS, GITHUB_URL } from "./content";

const COPYRIGHT_YEAR = new Date().getFullYear();

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-ink-950/45">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <GlimmerlockLogo className="h-10 w-40" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/45">
              A non-custodial USDC treasury, built on Arc with CCTP v2, Circle
              Gateway, and Morpho Earn.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Glimmerlock on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition hover:border-brand-300/30 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={ARC_STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 transition hover:border-brand-300/30 hover:text-white"
              >
                Built with Arc Studio
              </a>
            </div>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-[11px] text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {COPYRIGHT_YEAR} Glimmerlock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-xs text-white/45 transition hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
