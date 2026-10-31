export type DemoScenarioId =
  | "vault-deposit"
  | "local-withdraw"
  | "cctp-deposit"
  | "cctp-withdraw";

export type DemoStepKind = "user" | "assistant" | "draft" | "status";

export interface DemoDraft {
  eyebrow: string;
  title: string;
  amount: string;
  route: string;
  detail: string;
  caption: string;
}

export interface DemoStep {
  id: string;
  kind: DemoStepKind;
  delayMs: number;
  text?: string;
  label?: string;
  draft?: DemoDraft;
}

export interface DemoScenario {
  id: DemoScenarioId;
  tab: string;
  label: string;
  summary: string;
  steps: DemoStep[];
}

export interface DemoPlaybackState {
  scenarioIndex: number;
  stepIndex: number;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "vault-deposit",
    tab: "Deposit",
    label: "Vault deposit",
    summary: "Put idle USDC to work",
    steps: [
      {
        id: "vault-user",
        kind: "user",
        delayMs: 2600,
        text: "Put 10 USDC to work in the vault.",
      },
      {
        id: "vault-reply",
        kind: "assistant",
        delayMs: 3600,
        text: "I can prepare that. The draft deposits 10.00 USDC into the active Arc vault. You review and sign in your own wallet.",
      },
      {
        id: "vault-draft",
        kind: "draft",
        delayMs: 4400,
        draft: {
          eyebrow: "Unsigned draft",
          title: "Deposit draft",
          amount: "10.00 USDC",
          route: "Wallet → Arc treasury",
          detail: "Settle on Arc, then deploy into the active vault.",
          caption: "No transaction is submitted until you approve it.",
        },
      },
      {
        id: "vault-status",
        kind: "status",
        delayMs: 3800,
        label: "Review step",
        text: "Your wallet would show the exact deposit call. Glimmerlock never signs.",
      },
    ],
  },
  {
    id: "local-withdraw",
    tab: "Withdraw",
    label: "Local withdrawal",
    summary: "Move USDC back to your wallet",
    steps: [
      {
        id: "local-user",
        kind: "user",
        delayMs: 2500,
        text: "Withdraw 2 USDC to my Arc wallet.",
      },
      {
        id: "local-reply",
        kind: "assistant",
        delayMs: 3400,
        text: "The draft redeems from the vault and sends 2.00 USDC to your connected wallet. Your spending guardrails are checked before the wallet prompt.",
      },
      {
        id: "local-draft",
        kind: "draft",
        delayMs: 4200,
        draft: {
          eyebrow: "Unsigned draft",
          title: "Local withdrawal draft",
          amount: "2.00 USDC",
          route: "Arc treasury → your wallet",
          detail: "Redeem the active vault position and return USDC locally.",
          caption: "The wallet remains the final approver.",
        },
      },
      {
        id: "local-status",
        kind: "status",
        delayMs: 3600,
        label: "Guardrail",
        text: "The draft is checked against the live pause state, minimums, and spending limits before you review it.",
      },
    ],
  },
  {
    id: "cctp-deposit",
    tab: "Base → Arc",
    label: "Cross-chain in",
    summary: "Bring USDC from Base",
    steps: [
      {
        id: "cctp-in-user",
        kind: "user",
        delayMs: 2500,
        text: "Deposit 10 USDC from Base.",
      },
      {
        id: "cctp-in-reply",
        kind: "assistant",
        delayMs: 3800,
        text: "I'll prepare a CCTP v2 handoff. Base is the source, Arc is the destination, and the draft credits your treasury after settlement.",
      },
      {
        id: "cctp-in-draft",
        kind: "draft",
        delayMs: 4600,
        draft: {
          eyebrow: "Cross-chain handoff",
          title: "CCTP deposit",
          amount: "10.00 USDC",
          route: "Base → Arc",
          detail: "CCTP v2 · source burn · Arc receiver",
          caption: "Source gas and a small amount of Arc gas are required.",
        },
      },
      {
        id: "cctp-in-status",
        kind: "status",
        delayMs: 4200,
        label: "Demo only",
        text: "Your wallet would approve and burn on Base. This showcase stops before any transaction is submitted.",
      },
    ],
  },
  {
    id: "cctp-withdraw",
    tab: "Arc → Base",
    label: "Cross-chain out",
    summary: "Send USDC to another chain",
    steps: [
      {
        id: "cctp-out-user",
        kind: "user",
        delayMs: 2400,
        text: "Send 5 USDC to Base.",
      },
      {
        id: "cctp-out-reply",
        kind: "assistant",
        delayMs: 3800,
        text: "I'll prepare an unsigned CCTP withdrawal. It burns USDC on Arc and delivers it to Base after Circle attestation.",
      },
      {
        id: "cctp-out-draft",
        kind: "draft",
        delayMs: 4600,
        draft: {
          eyebrow: "Unsigned draft",
          title: "CCTP withdrawal",
          amount: "5.00 USDC",
          route: "Arc → Base",
          detail: "CCTP v2 · Arc burn · Base mint",
          caption: "The destination mint needs destination-chain gas.",
        },
      },
      {
        id: "cctp-out-status",
        kind: "status",
        delayMs: 4200,
        label: "Settlement",
        text: "Tracking begins only after the Arc burn confirms. Glimmerlock reads Circle Iris and the destination chain instead of guessing.",
      },
    ],
  },
];

export const FIRST_DEMO_STATE: DemoPlaybackState = {
  scenarioIndex: 0,
  stepIndex: 0,
};

export function currentScenario(state: DemoPlaybackState): DemoScenario {
  return DEMO_SCENARIOS[state.scenarioIndex] ?? DEMO_SCENARIOS[0];
}

export function currentStep(state: DemoPlaybackState): DemoStep {
  const scenario = currentScenario(state);
  return scenario.steps[state.stepIndex] ?? scenario.steps[0];
}

export function nextDemoState(
  state: DemoPlaybackState
): DemoPlaybackState {
  const scenario = currentScenario(state);
  if (state.stepIndex < scenario.steps.length - 1) {
    return { ...state, stepIndex: state.stepIndex + 1 };
  }
  return {
    scenarioIndex: (state.scenarioIndex + 1) % DEMO_SCENARIOS.length,
    stepIndex: 0,
  };
}

export function selectDemoScenario(
  scenarioIndex: number
): DemoPlaybackState {
  const safeIndex =
    ((scenarioIndex % DEMO_SCENARIOS.length) + DEMO_SCENARIOS.length) %
    DEMO_SCENARIOS.length;
  return { scenarioIndex: safeIndex, stepIndex: 0 };
}

export function replayDemo(): DemoPlaybackState {
  return { ...FIRST_DEMO_STATE };
}

export function scenarioProgress(state: DemoPlaybackState): number {
  const scenario = currentScenario(state);
  return (state.stepIndex + 1) / scenario.steps.length;
}
