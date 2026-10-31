import {
  ArrowRight,
  ArrowRightLeft,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  DEMO_SCENARIOS,
  currentScenario,
  currentStep,
  nextDemoState,
  replayDemo,
  scenarioProgress,
  selectDemoScenario,
  type DemoDraft,
  type DemoScenario,
  type DemoStep,
} from "./model";

function TypingText({
  text,
  active,
  reduced,
}: {
  text: string;
  active: boolean;
  reduced: boolean;
}) {
  const [typed, setTyped] = useState(() => (reduced ? text.length : 0));
  const visible = reduced ? text.length : typed;

  useEffect(() => {
    if (reduced || !active || visible >= text.length) return;
    const timer = window.setTimeout(
      () => setTyped((value) => Math.min(value + 1, text.length)),
      24
    );
    return () => window.clearTimeout(timer);
  }, [active, reduced, text.length, visible]);

  return (
    <span>
      {text.slice(0, visible)}
      {!reduced && active && visible < text.length && (
        <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-brand-200 align-[-2px]" />
      )}
    </span>
  );
}

function DemoDraftCard({ draft }: { draft: DemoDraft }) {
  return (
    <div className="mt-3 rounded-2xl border border-brand-400/30 bg-brand-700/10 p-3.5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-700/35 text-brand-200 ring-1 ring-brand-300/25">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-300">
            {draft.eyebrow}
          </p>
          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h4 className="font-display text-sm font-semibold text-white">
              {draft.title}
            </h4>
            <span className="font-mono text-sm font-semibold text-brand-100">
              {draft.amount}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-ink-950/35 px-2.5 py-2 text-[11px] text-brand-200">
            <span className="truncate">{draft.route.split(" → ")[0]}</span>
            <ArrowRight className="h-3 w-3 shrink-0 text-brand-400" />
            <span className="truncate">{draft.route.split(" → ")[1]}</span>
            <span className="ml-auto hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-white/35 sm:inline">
              Arc
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-white/55">
            {draft.detail}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-brand-200">
            <ShieldCheck className="h-3 w-3" />
            {draft.caption}
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoStepView({
  step,
  active,
  reduced,
}: {
  step: DemoStep;
  active: boolean;
  reduced: boolean;
}) {
  if (step.kind === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[86%] rounded-2xl rounded-br-md border border-brand-400/30 bg-brand-700/45 px-3.5 py-2.5 text-[12px] leading-relaxed text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <TypingText
            text={step.text ?? ""}
            active={active}
            reduced={reduced}
          />
        </div>
      </div>
    );
  }

  if (step.kind === "assistant") {
    return (
      <div className="flex items-start gap-2.5">
        <span className="glimmer-avatar mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-300">
            Glimmerlock
          </p>
          <div className="mt-1 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.055] px-3.5 py-2.5 text-[12px] leading-relaxed text-white/78">
            {step.text}
          </div>
        </div>
      </div>
    );
  }

  if (step.kind === "draft" && step.draft) {
    return <DemoDraftCard draft={step.draft} />;
  }

  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-300/25 bg-brand-700/25 text-brand-200">
        <Wallet className="h-3 w-3" />
      </span>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-300">
          {step.label}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-white/58">
          {step.text}
        </p>
      </div>
    </div>
  );
}

function ScenarioTabs({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="scrollbar-none flex gap-1 overflow-x-auto"
      aria-label="Demo scenarios"
    >
      {DEMO_SCENARIOS.map((scenario, index) => (
        <button
          key={scenario.id}
          type="button"
          aria-pressed={index === active}
          onClick={() => onSelect(index)}
          className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[10px] font-medium transition ${
            index === active
              ? "border-brand-300/35 bg-brand-700/35 text-brand-100"
              : "border-transparent text-white/40 hover:border-white/10 hover:bg-white/[0.05] hover:text-white/70"
          }`}
        >
          {scenario.tab}
        </button>
      ))}
    </div>
  );
}

function ScenarioFields({ scenario }: { scenario: DemoScenario }) {
  return (
    <div className="grid shrink-0 gap-3 border-t border-white/10 px-4 py-3 sm:grid-cols-3">
      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/32">
          Action
        </p>
        <p className="mt-1 text-[11px] font-medium text-white/72">
          {scenario.label}
        </p>
      </div>
      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/32">
          Intent
        </p>
        <p className="mt-1 text-[11px] font-medium text-white/72">
          {scenario.summary}
        </p>
      </div>
      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/32">
          Network
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-white/72">
          Arc mainnet
        </p>
      </div>
    </div>
  );
}

export function DemoShowcase() {
  const reduced = Boolean(useReducedMotion());
  const [state, setState] = useState(() => replayDemo());
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const scenario = useMemo(() => currentScenario(state), [state]);
  const step = useMemo(() => currentStep(state), [state]);
  const playing =
    !reduced && !userPaused && !hoverPaused && !focusPaused && !pageHidden;

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setState((current) => nextDemoState(current)),
      step.delayMs
    );
    return () => window.clearTimeout(timer);
  }, [playing, state.scenarioIndex, state.stepIndex, step.delayMs]);

  useEffect(() => {
    if (reduced) return;
    const container = messagesRef.current;
    if (!container) return;
    // Keep the newest demo step in view without moving the page.
    container.scrollTop = container.scrollHeight;
  }, [reduced, state.scenarioIndex, state.stepIndex]);

  const visibleSteps = reduced
    ? scenario.steps
    : scenario.steps.slice(0, state.stepIndex + 1);

  function chooseScenario(index: number) {
    setState(selectDemoScenario(index));
    setUserPaused(false);
    setHoverPaused(false);
    setFocusPaused(false);
  }

  function replay() {
    setState(replayDemo());
    setUserPaused(false);
    setHoverPaused(false);
    setFocusPaused(false);
  }

  function togglePaused() {
    setUserPaused((paused) => !paused);
    setHoverPaused(false);
    setFocusPaused(false);
  }

  return (
    <div
      className="landing-demo-frame relative flex h-[36rem] min-w-0 w-full flex-col overflow-hidden rounded-[26px] border border-white/12 sm:h-[38rem]"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusPaused(false);
        }
      }}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-brand-300/25 bg-brand-700/35 text-brand-200">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-xs font-semibold text-white">
              Glimmerlock
            </p>
            <p className="mt-0.5 flex items-center text-[9px] uppercase tracking-[0.18em] text-brand-300">
              Treasury chat demo
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-white/10 px-4 py-2.5 sm:px-5">
        <ScenarioTabs active={state.scenarioIndex} onSelect={chooseScenario} />
      </div>

      <div
        ref={messagesRef}
        className="landing-demo-messages min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
        aria-label="Simulated Glimmerlock conversation"
      >
        {visibleSteps.map((item, index) => (
          <DemoStepView
            key={item.id}
            step={item}
            active={
              !reduced && index === state.stepIndex && item.kind === "user"
            }
            reduced={reduced}
          />
        ))}
      </div>

      <ScenarioFields scenario={scenario} />

      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePaused}
            disabled={reduced}
            aria-label={userPaused ? "Resume demo" : "Pause demo"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-brand-300/35 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            {userPaused ? (
              <Play className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Pause className="h-3.5 w-3.5 fill-current" />
            )}
          </button>
          <button
            type="button"
            onClick={replay}
            aria-label="Replay demo"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-brand-300/35 hover:bg-white/[0.08] hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <span className="hidden text-[10px] text-white/38 sm:inline">
            {reduced
              ? "Static preview · motion reduced"
              : userPaused
              ? "Paused"
              : `${state.stepIndex + 1} / ${scenario.steps.length}`}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div
            className="h-1 w-20 overflow-hidden rounded-full bg-white/10 sm:w-28"
            role="progressbar"
            aria-label="Scenario progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scenarioProgress(state) * 100)}
          >
            <span
              className="block h-full rounded-full bg-brand-300 transition-[width] duration-300"
              style={{ width: `${scenarioProgress(state) * 100}%` }}
            />
          </div>
          <span className="hidden items-center gap-1 text-[10px] text-white/38 sm:flex">
            {scenario.tab}
            <ArrowRightLeft className="h-3 w-3 text-brand-400" />
          </span>
        </div>
      </div>

      <div className="shrink-0 border-t border-white/8 bg-white/[0.025] px-4 py-2.5 text-center text-[9px] leading-relaxed text-white/32 sm:px-5">
        Demonstration only. No funds move, no wallet opens, and no transaction
        is submitted.
      </div>

      <p className="sr-only" aria-live="polite">
        {reduced
          ? `${scenario.label} shown as a static demonstration.`
          : `Scenario ${state.scenarioIndex + 1} of ${
              DEMO_SCENARIOS.length
            }. Step ${state.stepIndex + 1} of ${scenario.steps.length}. ${
              step.text ?? scenario.label
            }`}
      </p>
    </div>
  );
}
