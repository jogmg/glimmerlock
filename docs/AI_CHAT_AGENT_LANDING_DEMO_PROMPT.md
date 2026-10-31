# AI Chat Agent Landing Demo Prompt

## Prompt

Use the prompt below to implement the scripted chat loop in this repository. It is an auto-playing, silent UI demonstration with manual pause, replay, and scenario controls.

```text
Build a polished Glimmerlock landing-page showcase for the AI Chat Agent that demonstrates treasury actions as a scripted, auto-playing chat loop. Include manual pause, replay, and scenario controls. The loop is silent; never autoplay sound.

Start by inspecting the current app entry, routing, page components, chat UI, action cards, and existing tests. The repository currently renders a treasury app with Overview and Hermes tabs; do not assume there is already a separate public marketing landing page. Preserve the existing treasury app and its Overview workflow. If a distinct landing page or route exists, add the showcase there. If none exists, add a dedicated landing surface using the project's established navigation/routing conventions and keep the existing app reachable. Do not silently replace the authenticated app or its root behavior.

The goal is a compact, convincing product demonstration that looks like the actual Hermes chat experience in this app. Visitors should see the prompt being entered, the assistant response, the action handoff/draft card, and the relevant review or transfer-progress states. The demo should loop automatically like a video, but remain crisp text and real responsive UI rather than a video asset.

Project behavior to preserve:
- The main chat UI is in src/components/HermesDock.tsx. It renders user and assistant messages, unsigned intent cards, and the cross-chain deposit handoff card.
- The inbound CCTP deposit handoff UI is in src/components/HermesCctpDepositCard.tsx. Its real path checks source balance, treasury pause state, vault minimum/share preview, and Arc gas; then may request source approval, a source-chain burn, an Iris attestation, and an Arc receive-and-process transaction.
- The existing BFF/client and wallet execution live in src/lib/hermes.ts and src/hooks/useHermesIntentExecution.ts. The real app makes unsigned drafts, revalidates them, then asks the user's wallet to sign. Hermes never signs or broadcasts.
- Mainnet's live deposit minimum is 5 USDC; do not show a smaller deposit as valid. Do not invent balances, APY, yield, addresses, transaction hashes, or live chain status.
- The current visual language uses Space Grotesk, DM Sans, and JetBrains Mono; the Glimmerlock dark surface, muted steel-blue accents, and literal primary blue #083D77 are defined in src/index.css and related components. Preserve the brand and existing component conventions rather than introducing a generic AI-chat theme.

Demonstrate these four scenarios, in a repeatable order:
1. Local deposit: user types “Deposit 10 USDC into my Arc treasury.” Show a concise assistant response and an unsigned deposit draft, including the wallet-to-Arc route. If showing approval, label it as a possible required approval, not a completed approval.
2. Local withdrawal: user types “Withdraw 2 USDC to my Arc wallet.” Show the unsigned withdrawal draft and Arc-to-connected-wallet route. Do not imply a withdrawal happened.
3. Cross-chain deposit: user types “Deposit 10 USDC from Base into my treasury.” Show the distinct CCTP deposit handoff and a restrained sequence of source-chain preflight, optional approval, burn, waiting for Circle attestation, and Arc completion steps. Mark all progress as a demonstration; do not imply that an actual burn, attestation, or deposit occurred.
4. Cross-chain withdrawal: user types “Withdraw 5 USDC to Base.” Show the unsigned draft with Arc-to-Base route and wallet-review handoff. Optionally show subsequent CCTP tracking steps only as clearly simulated/illustrative stages. Never show a real-looking transaction hash or label it confirmed/delivered.

Implementation requirements:
- Use deterministic local fixtures and a small explicit scenario/state model. Do not call /api/chat, /api/intents, Hermes, RPCs, Circle Iris, wagmi write hooks, or wallet APIs from the showcase. Do not reuse live chat hooks in a way that can submit anything.
- Reuse existing visual components where safe and practical. If their props or dependencies require live state, create presentation-only variants that match their real layout and wording; do not couple the showcase to authenticated state or make the production chat depend on demo fixtures.
- Keep the distinction between an unsigned draft, a user wallet review/signature, a submitted transaction, and a confirmed result accurate. The demo may animate illustrative states, but visibly label the panel “Interactive demo” or “Illustrative flow” and avoid fabricated completion claims.
- Add user controls for pause/play, replay, and choosing one of the four scenarios. Provide a visible progress indicator and a clear way to replay the full sequence. Pause on hover/focus or other interaction, on document visibility loss, and honor prefers-reduced-motion by disabling autoplay and typing effects. Avoid fast typing, excessive blinking, and forced scrolling.
- Make the entire feature usable by keyboard and screen readers. Use semantic buttons, accessible names, live-region announcements that do not repeat every animation frame, visible focus, sufficient contrast, and a static meaningful state when motion is reduced.
- Design the showcase to fit its parent rather than assume a desktop width. Verify narrow mobile and desktop layouts; no clipped chat text, overlapping controls, unstable card dimensions, or horizontal scrolling.
- Match the established Glimmerlock styling and icons. Keep actions and status compact, with readable USDC amounts, explicit chain names, and a visible unsigned/demo state. Avoid decorative card nesting or a wall of helper copy.
- Keep the feature scoped. Do not change contract behavior, BFF validation, real wallet execution, current chat behavior, or deployment configuration.
- Add focused tests for scenario order/transitions, pause/replay/selection, and reduced-motion behavior where supported by the existing test setup. Run the relevant tests plus the project typecheck/build and report exact results.

Before editing, identify the landing-page integration point and state a brief hypothesis about how the demo should be isolated from the real chat. After the first edit, run the narrowest relevant test or typecheck before further changes. Finish with a concise summary, the route/location, and any remaining caveats.
```
