import { clsx } from "clsx";
import type { ReactNode } from "react";

type StatTone = "brand" | "gain";

interface Props {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  accentTone?: StatTone;
  subTone?: "muted" | "gain";
  className?: string;
  icon?: ReactNode;
}

export function StatCard({
  label,
  value,
  sub,
  accent,
  accentTone = "brand",
  subTone = "muted",
  className,
  icon,
}: Props) {
  const accentText = accentTone === "gain" ? "text-gain-400" : "text-brand-300";
  const subText = subTone === "gain" ? "text-gain-300" : "text-slate-500";

  return (
    <div
      className={clsx(
        "rounded-xl border border-slate-700 bg-ink-950/55 p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>
        {icon && (
          <span className={accent ? accentText : "text-slate-500"}>{icon}</span>
        )}
      </div>
      <p
        className={clsx(
          "mt-2 font-mono text-2xl font-semibold tabular-nums",
          accent ? accentText : "text-white"
        )}
      >
        {value}
      </p>
      {sub && <p className={clsx("mt-1 text-xs", subText)}>{sub}</p>}
    </div>
  );
}
