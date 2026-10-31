import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Eye,
  ExternalLink,
  Github,
  Layers3,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { ArcMark } from "../components/ArcMark";
import { StudioWatermark } from "../components/StudioWatermark";
import { STUDIO_PREVIEW } from "../lib/studioPreview";
import { DemoShowcase } from "./demo/DemoShowcase";
import {
  CAPABILITIES,
  CCTP_PROOF,
  GITHUB_URL,
  HOW_IT_WORKS,
  MAINNET_CONTRACTS,
  PROTOCOLS,
  SECURITY_POINTS,
  WHATS_REAL,
  WHY_ARC,
  FAQS,
} from "./content";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { ArrowLink, EyebrowDot, Reveal, SectionHeader } from "./primitives";

function CapabilityIcon({ name }: { name: string }) {
  const className = "h-5 w-5";
  if (name === "route") return <Route className={className} />;
  if (name === "yield") return <TrendingUp className={className} />;
  if (name === "shield") return <ShieldCheck className={className} />;
  if (name === "eye") return <Eye className={className} />;
  if (name === "lock") return <LockKeyhole className={className} />;
  return <Sparkles className={className} />;
}

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid w-full max-w-[90rem] gap-14 px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(30rem,0.98fr)] lg:items-center lg:gap-16 lg:px-12 lg:pb-24 lg:pt-24">
        <Reveal mount className="relative z-10 min-w-0">
          <div className="flex items-center text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-300">
            USDC treasury
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.9rem,6vw,5.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
            Give your agent a treasury.
            <span className="mt-2 block text-brand-300">Keep the keys.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[16px] leading-7 text-white/58 sm:text-lg sm:leading-8">
            Glimmerlock turns plain language into reviewable USDC actions on
            Arc. Deposit, withdraw, and move across chains, with every
            transaction signed in your wallet.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/app"
              className="glimmer-primary-cta inline-flex items-center justify-center gap-2 px-6 py-4 text-sm shadow-brand-glow"
            >
              Open app
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 px-6 py-4 text-sm font-semibold text-white/70 transition hover:border-brand-300/35 hover:bg-white/[0.04] hover:text-white"
            >
              See the flow
              <span className="text-brand-300">↓</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/38">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-brand-300" />
              No custodial keys
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-brand-300" />
              Wallet-signed actions
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-brand-300" />5 USDC mainnet
              minimum
            </span>
          </div>
        </Reveal>

        <Reveal mount delay={0.12} className="relative z-10 min-w-0">
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-brand-500/10 blur-3xl" />
          <DemoShowcase />
        </Reveal>
      </div>

      <div className="border-y border-white/[0.08] bg-white/[0.018]">
        <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4 sm:px-8 lg:px-12">
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/28">
            Built on
          </span>
          {PROTOCOLS.map((protocol, index) => (
            <span
              key={protocol}
              className="flex items-center gap-2 text-[11px] font-medium text-white/55"
            >
              {index === 0 ? (
                <ArcMark size={14} />
              ) : (
                <span className="h-1 w-1 rounded-full bg-brand-400" />
              )}
              {protocol}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsReal() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <Reveal>
        <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-300">
              Proof over projections
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              The numbers on this page are real.
            </h2>
          </div>
          <ArrowLink href="#proof">Inspect the contracts</ArrowLink>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {WHATS_REAL.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.05}>
            <div className="h-full bg-ink-950/80 p-5 sm:p-6">
              <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-brand-200">
                {item.value}
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">
                {item.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/38">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <Reveal>
        <SectionHeader
          number="01"
          eyebrow="The flow"
          title={
            <>
              One conversation.
              <br />
              Three deliberate moves.
            </>
          }
          body="Glimmerlock is not a black-box trading bot. It is a review surface for money actions: understand the request, inspect the exact draft, and approve it in your own wallet."
        />
      </Reveal>

      <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
        {HOW_IT_WORKS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.08}>
            <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-300/25 hover:bg-white/[0.045]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-brand-300">
                  {step.number}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-300/20 bg-brand-700/25 text-brand-200">
                  {index === 0 ? (
                    <Sparkles className="h-4 w-4" />
                  ) : index === 1 ? (
                    <Layers3 className="h-4 w-4" />
                  ) : (
                    <Wallet className="h-4 w-4" />
                  )}
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/48">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-brand-300/15 bg-brand-700/10 px-4 py-3 text-[11px] text-brand-100/65">
          <span className="font-semibold uppercase tracking-[0.16em] text-brand-200">
            The constant
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Glimmerlock proposes.
          </span>
          <span className="flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5" />
            Your wallet signs.
          </span>
          <span className="flex items-center gap-1.5">
            <CircleDollarSign className="h-3.5 w-3.5" />
            Arc settles.
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function Capabilities() {
  return (
    <section
      id="product"
      className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <Reveal>
        <SectionHeader
          number="02"
          eyebrow="The product"
          title={
            <>
              A treasury interface with a
              <br className="hidden sm:block" /> short leash.
            </>
          }
          body="The useful parts of an agent (speed and natural language) without handing it a signer, a free-form transaction field, or the final say over settlement."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((capability, index) => (
          <Reveal
            key={capability.title}
            delay={(index % 3) * 0.06}
            className={capability.span ?? ""}
          >
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-brand-300/25 hover:bg-white/[0.048] sm:p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-brand-400/15" />
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-300/20 bg-brand-700/25 text-brand-200">
                <CapabilityIcon name={capability.icon} />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-[-0.02em] text-white">
                {capability.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/48">
                {capability.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyArc() {
  return (
    <section
      id="why-arc"
      className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[radial-gradient(circle_at_72%_0%,rgba(79,117,160,0.24),transparent_28rem),linear-gradient(145deg,rgba(15,25,36,0.92),rgba(10,14,17,0.88))] p-6 shadow-panel sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-brand-300/10" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border border-brand-300/10" />
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeader
                number="03"
                eyebrow="Why Arc"
                title={
                  <>
                    Stablecoin money deserves a
                    <span className="text-brand-300"> stablecoin chain.</span>
                  </>
                }
                body="Arc keeps the asset, the gas, and the settlement path in the same dollar-denominated system. That simplicity is the point: fewer moving parts between a user's intent and a verifiable balance."
              />
              <div className="mt-8 flex flex-wrap gap-2">
                {["USDC Gas", "CCTP v2", "Circle Gateway", "Morpho Earn"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand-300/18 bg-brand-700/15 px-3 py-1.5 text-[10px] font-medium text-brand-100/70"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-[23rem] items-center justify-center">
              <div className="landing-pulse absolute inset-0 rounded-full border border-brand-300/12" />
              <div className="absolute inset-[13%] rounded-full border border-brand-300/14" />
              <div className="absolute inset-[27%] rounded-full border border-brand-300/16" />
              <div className="landing-float relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-brand-300/25 bg-brand-700/30 shadow-brand-glow backdrop-blur-xl">
                <ArcMark size={40} />
                <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-brand-200">
                  ARC · 5042
                </span>
              </div>
              <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-white/10 bg-ink-950/80 px-2.5 py-1 text-[9px] font-medium text-white/50">
                USDC Gas
              </span>
              <span className="absolute bottom-3 left-0 rounded-full border border-white/10 bg-ink-950/80 px-2.5 py-1 text-[9px] font-medium text-white/50">
                CCTP v2
              </span>
              <span className="absolute right-0 top-1/2 rounded-full border border-white/10 bg-ink-950/80 px-2.5 py-1 text-[9px] font-medium text-white/50">
                Gateway
              </span>
              <span className="absolute bottom-8 right-2 rounded-full border border-white/10 bg-ink-950/80 px-2.5 py-1 text-[9px] font-medium text-white/50">
                Morpho
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ARC.map((reason, index) => (
              <div key={reason.title} className="bg-ink-950/65 p-5">
                <span className="font-mono text-[10px] text-brand-400">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-sm font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-white/40">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Security() {
  return (
    <section
      id="security"
      className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeader
            number="04"
            eyebrow="Security"
            title={
              <>
                Boring where
                <br />
                it matters.
              </>
            }
            body="The assistant is useful because it is constrained. The parts that can move money are typed, simulated, bound to a wallet, and deliberately small."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {SECURITY_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-brand-300">
                  <LockKeyhole className="h-3.5 w-3.5" />0{index + 1}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-white/42">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section
      id="proof"
      className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <Reveal>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              number="05"
              eyebrow="On-chain proof"
              title="Proof, not promises."
              body="These are the Arc mainnet contracts this page is describing. The CCTP proof link goes to a real Base → Arc settlement, not a mockup."
            />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/12 px-4 py-3 text-xs font-semibold text-white/65 transition hover:border-brand-300/30 hover:text-white"
            >
              <Github className="h-4 w-4" />
              Review the source
            </a>
          </div>

          <div className="mt-9 grid gap-3 lg:grid-cols-3">
            {MAINNET_CONTRACTS.map((contract) => (
              <a
                key={contract.name}
                href={contract.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-ink-950/55 p-4 transition hover:border-brand-300/30 hover:bg-brand-700/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-white/75">
                    {contract.name}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-white/28 transition group-hover:text-brand-300" />
                </div>
                <p className="mt-3 break-all font-mono text-[10px] leading-5 text-brand-200/60">
                  {contract.address}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.2fr]">
            <a
              href={CCTP_PROOF.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-brand-300/20 bg-brand-700/15 p-4 transition hover:border-brand-300/40 hover:bg-brand-700/25"
            >
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-300">
                  CCTP settlement
                </span>
                <span className="mt-1 block text-sm font-medium text-white">
                  {CCTP_PROOF.label}
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-200 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal>
          <SectionHeader
            number="06"
            eyebrow="Questions"
            title={
              <>
                The honest
                <br />
                answers.
              </>
            }
            body="No yield promises, no invented audits, no mystery custody. If something is still pending, it is labeled that way."
          />
        </Reveal>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                <span className="text-sm font-medium text-white/78 transition group-open:text-white">
                  {faq.question}
                </span>
                <Plus className="faq-chevron h-4 w-4 shrink-0 text-brand-300" />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-xs leading-6 text-white/45">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[30px] border border-brand-300/20 bg-[radial-gradient(circle_at_50%_0%,rgba(79,117,160,0.3),transparent_32rem),linear-gradient(145deg,rgba(8,61,119,0.52),rgba(10,14,17,0.92))] px-6 py-14 text-center sm:px-10 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[60%] -translate-x-1/2 rounded-full bg-brand-400/15 blur-3xl" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-200">
              The treasury is ready
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
              One conversation away from
              <span className="text-brand-200"> your first move.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/52">
              Open the app, connect a wallet, and ask Glimmerlock what you want
              to do. You will still be the one who signs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/app"
                className="glimmer-primary-cta inline-flex items-center justify-center gap-2 px-7 py-4"
              >
                Open app
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/14 px-7 py-4 text-sm font-semibold text-white/65 transition hover:border-brand-200/40 hover:bg-white/[0.05] hover:text-white"
              >
                <Github className="h-4 w-4" />
                View source
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function LandingPage() {
  return (
    <div className="landing-page font-body text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <LandingHeader />
      <main id="main-content">
        <Hero />
        <WhatIsReal />
        <HowItWorks />
        <Capabilities />
        <WhyArc />
        <Security />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
      <LandingFooter />
      {STUDIO_PREVIEW && <StudioWatermark />}
    </div>
  );
}
