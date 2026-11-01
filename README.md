# Glimmerlock

<p align="center">
  <img src="public/glimmerlock-white.svg" alt="Glimmerlock" width="720">
</p>

<p align="center">
  A cross-chain USDC treasury for AI agents, built on Arc.
</p>

<p align="center">
  <a href="https://8080-agqvtg5gwokf3k7e5easq4hd5e.instabox.tech/app">Open the app</a> ·
  <a href="https://studio.arc.io/app/459b639e-b500-4f59-b057-aa17f5446888">Arc Studio project</a> ·
  <a href="https://explorer.arc.io/address/0xf71b5d1a19d72b98675785123fae811698be6f63">Arc mainnet treasury</a>
</p>

Glimmerlock lets users deposit USDC from supported networks, put funds to work in an approved Morpho vault on Arc, and withdraw locally or transfer funds to another supported network. An intent-driven chat assistant lets users request supported actions in everyday language and review a transaction before signing it with their own wallet.

> **Mainnet status:** Glimmerlock is live on Arc mainnet with intentionally low limits. The contracts have not been independently audited. Do not use the project to custody third-party funds.

## How It Works

1. **Deposit USDC.** Deposit on Arc or start a Circle CCTP transfer from a supported network.
2. **Earn through Morpho.** The treasury can place USDC in an approved Morpho vault through its adapter.
3. **Withdraw.** Withdraw USDC to a wallet on Arc or request a CCTP transfer to a supported network.
4. **Use chat to prepare actions.** Describe an action in the Glimmerlock chat. The service validates the request and prepares an unsigned transaction for review. Your wallet remains responsible for signing and submitting it.

The supported CCTP destinations on mainnet are Ethereum, Avalanche, Optimism, Arbitrum, Base, and Polygon. Availability depends on Circle's supported routes and the live network configuration.

## Architecture

- **Arc smart contracts:** `AgentTreasury` tracks treasury balances, deposits, withdrawals, and spending limits. `MorphoVaultAdapter` connects the treasury to approved ERC-4626 vaults. `CCTPReceiverV2` processes inbound CCTP messages and records the source network.
- **Morpho vault:** USDC is deposited and redeemed through the adapter. The live mainnet vault is Galaxy USDC.
- **Web application:** A React, TypeScript, and Vite application connects to the user's wallet, reads on-chain balances and activity, and presents transaction flows.
- **Chat and backend:** Hermes provides the AI chat and private backend services. The backend validates supported requests and prepares unsigned transaction drafts. It does not hold user signing keys, sign transactions, or independently authorize transfers.
- **Cross-chain transfers:** Circle CCTP handles USDC movement between supported networks. The app tracks Circle attestations and guides the user through the destination transaction. Glimmerlock does not operate its own public relayer.
- **Source of truth:** Arc contract state and transaction events are authoritative for treasury balances and actions. Backend storage supports chat, sessions, and monitoring, but does not control treasury funds.

## Arc Mainnet

| Contract             | Address                                      | Explorer                                                                                    |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `AgentTreasury`      | `0xf71b5d1a19d72b98675785123fae811698be6f63` | [View contract](https://explorer.arc.io/address/0xf71b5d1a19d72b98675785123fae811698be6f63) |
| `MorphoVaultAdapter` | `0x5102057330f5bb5f3e4eb0925b7d1eac8a563c23` | [View contract](https://explorer.arc.io/address/0x5102057330f5bb5f3e4eb0925b7d1eac8a563c23) |
| `CCTPReceiverV2`     | `0x847F55221F30675791d2fAaf84f93B1fa86399E2` | [View contract](https://explorer.arc.io/address/0x847F55221F30675791d2fAaf84f93B1fa86399E2) |

The mainnet vault has a 5 USDC minimum deposit. The owner agent has 25 USDC per day and 50 USDC per week spending limits. These guardrails are not a substitute for an audit.

### Transaction Evidence

- [5 USDC treasury deposit](https://explorer.arc.io/tx/0xf48c28d10b8c1d4c25b0b27fb19f6ce0df3c02abbea4f88551dc6b353fc50225)
- [Base-to-Arc CCTP deposit processed by `CCTPReceiverV2`](https://explorer.arc.io/tx/0xdd79d20a0cf3c09a9bb85baeb7d0aafdf35fc95cf7f63c5d7c3ff80f0d873b86)
- [Complete deployment and transaction record](deployments/arc-mainnet.json)

The mainnet contracts were deployed with the owner's wallet, outside the Arc Studio deployment registry. Arc Studio's deployment panel contains historical testnet deployments. See the [submission notes](SUBMISSION.md) for the project's build and deployment history.

## Arc Studio

Glimmerlock originated in Arc Studio. The contract sources were synchronized to the existing Studio project earlier, and the current app-only frontend source was synchronized on November 1, 2026. The public landing page and route split in this repository are maintained separately and are not part of that Studio workspace. Arc Studio was used for the project's development and testnet work; the live mainnet deployment was signed separately with the owner's wallet.

## Run Locally

Requirements: [Bun](https://bun.sh/) and [Foundry](https://book.getfoundry.sh/) for the smart contracts.

```bash
bun install
bun run dev
```

The development server runs at `http://localhost:5173`. The default frontend configuration targets Arc mainnet. To use the testnet configuration:

```bash
VITE_ARC_NETWORK=testnet bun run dev
```

Run the frontend checks and tests:

```bash
bun run check
bun run test
bun run build
```

Build and test the contracts from the `contracts/` directory. Install the Foundry dependencies first if needed:

```bash
cd contracts
forge install foundry-rs/forge-std --no-commit
forge install OpenZeppelin/openzeppelin-contracts@v5.1.0 --no-commit
forge build
forge test
```

## Project Links

- [Live application](https://8080-agqvtg5gwokf3k7e5easq4hd5e.instabox.tech/app)
- [Arc Studio project](https://studio.arc.io/app/459b639e-b500-4f59-b057-aa17f5446888)
- [Source repository](https://github.com/jogmg/glimmerlock)
- [Arc mainnet deployment record](deployments/arc-mainnet.json)
- [Architecture](docs/ARCHITECTURE.md)
- [Security notes](docs/SECURITY.md)
- [Operations runbook](docs/RUNBOOK.md)
- [Chat and wallet execution design](docs/HERMES_USER_EXECUTION.md)
- [Arc Studio synchronization notes](docs/STUDIO_SYNC.md)

## License

This project is licensed under the [MIT License](LICENSE).
