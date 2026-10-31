import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  mount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mount?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={mount ? { opacity: 1, y: 0 } : undefined}
      whileInView={mount ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  body,
  align = "left",
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}>
      <div
        className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-300 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="font-mono text-brand-400">{number}</span>
        <span className="h-px w-8 bg-brand-400/50" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-7 text-white/55 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-brand-200 transition hover:text-white ${className}`}
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}

export function EyebrowDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-30" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
    </span>
  );
}
