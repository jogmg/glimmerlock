/*
 *  ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗
 *  ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
 *  ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
 *  ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
 *  ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
 *  ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝
 *
 *  Built with Arc Studio
 *  https://studio.arc.io
 */

import "./tracing";
import "./console-capture";

import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { LandingPage } from "./landing/LandingPage";
import { STUDIO_PREVIEW } from "./lib/studioPreview";
import { resolveRoute } from "./lib/routes";
import { GlimmerlockLogo } from "./components/GlimmerlockLogo";
import "./index.css";

const AppSurface = lazy(() => import("./app/AppSurface"));

function AppLoading() {
  return (
    <div className="glimmer-page flex min-h-dvh items-center justify-center px-6">
      <div
        role="status"
        aria-label="Opening treasury"
        className="flex flex-col items-center gap-5 text-center"
      >
        <GlimmerlockLogo className="h-10 w-40" />
        <span
          aria-hidden="true"
          className="h-1 w-24 overflow-hidden rounded-full bg-white/10"
        >
          <span className="glimmer-app-loading-sweep block h-full w-2/5 rounded-full bg-brand-400" />
        </span>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-brand-300">
          Opening treasury
        </p>
      </div>
    </div>
  );
}

function Root() {
  const resolution = resolveRoute({
    pathname: window.location.pathname,
    search: window.location.search,
    studioPreview: STUDIO_PREVIEW,
  });

  useEffect(() => {
    if (resolution.replaceTo) {
      window.history.replaceState(null, "", resolution.replaceTo);
    }
  }, [resolution.replaceTo]);

  useEffect(() => {
    document.title =
      resolution.surface === "app"
        ? "Glimmerlock App"
        : "Glimmerlock: USDC treasury for AI agents";
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (description) {
      description.content =
        resolution.surface === "app"
          ? "Glimmerlock treasury workspace: review, sign, and track USDC actions on Arc."
          : "Give your AI agent a USDC treasury without giving up the keys. Review every action and sign it in your wallet.";
    }
  }, [resolution.surface]);

  if (resolution.surface === "app") {
    return (
      <Suspense fallback={<AppLoading />}>
        <AppSurface />
      </Suspense>
    );
  }

  return <LandingPage />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
