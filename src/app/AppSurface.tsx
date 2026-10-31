import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { Toaster } from "sonner";
import { WagmiProvider } from "wagmi";
import App from "../App";
import { StudioWatermark } from "../components/StudioWatermark";
import { config } from "../config";

const queryClient = new QueryClient();

/**
 * The wallet-capable app is loaded only on `/app`, so the public landing page
 * does not download wagmi, ConnectKit, or any treasury data hooks.
 */
export default function AppSurface() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <App />
          <StudioWatermark />
          <Toaster position="top-center" />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
