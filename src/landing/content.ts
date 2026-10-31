export const GITHUB_URL = "https://github.com/jogmg/glimmerlock";
export const ARC_STUDIO_URL =
  "https://studio.arc.io/app/459b639e-b500-4f59-b057-aa17f5446888";
export const ARC_EXPLORER_URL = "https://explorer.arc.io";

export const PROTOCOLS = [
  "Arc mainnet",
  "CCTP v2",
  "Circle Gateway",
  "Morpho Earn",
  "USDC",
];

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#product", label: "Product" },
  { href: "#why-arc", label: "Why Arc" },
  { href: "#security", label: "Security" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
];

export const WHATS_REAL = [
  {
    value: "3",
    label: "mainnet contracts live",
    detail: "Treasury, vault adapter, and CCTP receiver on Arc.",
  },
  {
    value: "2",
    label: "directions settled",
    detail: "Base → Arc and Arc → Base CCTP paths have been exercised.",
  },
  {
    value: "5",
    label: "USDC mainnet minimum",
    detail: "A live, economics-based floor, not a marketing number.",
  },
  {
    value: "25 / 50",
    label: "USDC daily / weekly caps",
    detail: "Low limits stay in place until an external audit.",
  },
];

export const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Ask in plain language",
    body: "“Deposit 10 USDC from Base.” Glimmerlock reads your intent and checks the live treasury state.",
  },
  {
    number: "02",
    title: "Review the exact draft",
    body: "The BFF derives one allowlisted call, simulates it, and binds it to your signed-in wallet. No arbitrary calldata.",
  },
  {
    number: "03",
    title: "Sign in your wallet",
    body: "Your wallet is the final approver. Glimmerlock never holds keys, signs, or broadcasts.",
  },
];

export const CAPABILITIES = [
  {
    icon: "route",
    title: "Cross-chain by default",
    body: "Move USDC in and out with CCTP v2. Source domains, recipients, and destination chains are validated before a draft exists.",
    span: "lg:col-span-2",
  },
  {
    icon: "yield",
    title: "Idle USDC works",
    body: "Deposits deploy into a live Morpho Earn vault on Arc. The app shows the current APY and share price instead of hardcoding a promise.",
  },
  {
    icon: "shield",
    title: "Guardrails before gas",
    body: "Pause state, 5 USDC minimum, 25/day and 50/week caps, and allowlisted calls are checked first.",
  },
  {
    icon: "eye",
    title: "Truth from the chain",
    body: "Balances come from Arc reads. CCTP completion comes from Circle Iris and the destination chain, never from a model.",
  },
  {
    icon: "lock",
    title: "No keys, no custody",
    body: "Your wallet signs every transaction. The public chat profile has no terminal, filesystem, signer, or keeper key.",
  },
  {
    icon: "spark",
    title: "Chat is an interface, not authority",
    body: "The model supplies only semantic values. The BFF derives calldata, validates every field, and stores an unsigned intent.",
    span: "lg:col-span-2",
  },
];

export const WHY_ARC = [
  {
    title: "USDC is the native gas asset",
    body: "The same dollar rail that moves your treasury also pays for execution. No separate volatile gas token enters the flow.",
  },
  {
    title: "Circle’s rails live here",
    body: "Arc is purpose-built for stablecoin settlement, with CCTP v2 and Circle Gateway available to the same treasury contract.",
  },
  {
    title: "Yield without leaving",
    body: "Morpho Earn vaults settle on Arc, so deposits can move from USDC to a yield position without a second custody layer.",
  },
  {
    title: "One chain of evidence",
    body: "Treasury, adapter, receiver, and every CCTP message resolve to Arc mainnet activity the app can read directly.",
  },
];

export const MAINNET_CONTRACTS = [
  {
    name: "AgentTreasury",
    address: "0xf71b5d1a19d72b98675785123fae811698be6f63",
    href: `${ARC_EXPLORER_URL}/address/0xf71b5d1a19d72b98675785123fae811698be6f63`,
  },
  {
    name: "MorphoVaultAdapter",
    address: "0x5102057330f5bb5f3e4eb0925b7d1eac8a563c23",
    href: `${ARC_EXPLORER_URL}/address/0x5102057330f5bb5f3e4eb0925b7d1eac8a563c23`,
  },
  {
    name: "CCTPReceiverV2",
    address: "0x847F55221F30675791d2fAaf84f93B1fa86399E2",
    href: `${ARC_EXPLORER_URL}/address/0x847F55221F30675791d2fAaf84f93B1fa86399E2`,
  },
];

export const CCTP_PROOF = {
  label: "Base → Arc · 5 USDC",
  href: `${ARC_EXPLORER_URL}/tx/0xdd79d20a0cf3c09a9bb85baeb7d0aafdf35fc95cf7f63c5d7c3ff80f0d873b86`,
};

export const SECURITY_POINTS = [
  {
    title: "Wallet-only execution",
    body: "Every deposit, local withdrawal, and CCTP withdrawal is signed in a browser wallet. The assistant has no execute tool.",
  },
  {
    title: "Deterministic drafts",
    body: "The BFF derives the target, calldata, and value from an allowlisted method. A model cannot invent a transaction.",
  },
  {
    title: "Small caps, honest status",
    body: "The mainnet treasury is unaudited and capped at 25 USDC/day and 50 USDC/week. Transfer completion is read from Circle Iris and the destination chain.",
  },
  {
    title: "Private operations",
    body: "Only nginx is public. The BFF, chat runtime, MCP server, monitor, and Postgres stay on a private network.",
  },
];

export const FAQS = [
  {
    question: "Does Glimmerlock hold my funds or keys?",
    answer:
      "No. The treasury is a non-custodial contract. Your wallet signs each action, and Glimmerlock never holds a private key or seed phrase.",
  },
  {
    question: "What can I ask Glimmerlock to do?",
    answer:
      "Check treasury balances and activity, prepare an unsigned deposit, withdraw locally to your Arc wallet, start a CCTP withdrawal, or prepare an inbound CCTP deposit from another chain.",
  },
  {
    question: "Which chains are supported?",
    answer:
      "Arc is the treasury home. CCTP destinations include Ethereum, Avalanche, Optimism, Arbitrum, Base, and Polygon, subject to the live destination map and source-chain gas.",
  },
  {
    question: "What are the limits?",
    answer:
      "Mainnet deposits have a 5 USDC minimum. The owner agent is capped at 25 USDC per day and 50 USDC per week. Limits stay low until an external audit.",
  },
  {
    question: "Does the AI decide when a transfer is complete?",
    answer:
      "No. The app reads Arc events, Circle Iris attestations, and destination-chain delivery. The treasury’s bookkeeping flag is not treated as proof of delivery.",
  },
  {
    question: "Is the treasury audited?",
    answer:
      "Not yet. It is live on Arc mainnet with guardrails and small caps. An external audit is required before limits are raised or third-party agents are onboarded.",
  },
  {
    question: "Which wallet do I need?",
    answer:
      "Any EIP-1193/EIP-6963 browser wallet works, including MetaMask, Rabby, Coinbase Wallet, Brave, and Frame. The app is wallet-agnostic.",
  },
];

export const FOOTER_LINKS = {
  product: [
    { href: "/app", label: "Open app" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#why-arc", label: "Why Arc" },
    { href: "#security", label: "Security" },
    { href: "#faq", label: "FAQ" },
  ],
  resources: [
    { href: GITHUB_URL, label: "Source repository" },
    { href: `${GITHUB_URL}#readme`, label: "Documentation" },
    { href: ARC_STUDIO_URL, label: "Arc Studio project" },
    { href: `${GITHUB_URL}/issues`, label: "Report an issue" },
  ],
};
