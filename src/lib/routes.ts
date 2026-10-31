/**
 * The public landing page owns `/`. The authenticated treasury app lives at
 * `/app`. Studio previews also start on the landing page; `?app=1` is kept as a
 * manual escape hatch for sandboxes that cannot follow a nested path.
 */

export const APP_PATH = "/app";

export type AppSurface = "landing" | "app";

export interface RouteResolution {
  surface: AppSurface;
  /** When set, replace the current URL before rendering the app surface. */
  replaceTo?: string;
}

export function normalizePathname(pathname: string): string {
  const value = pathname.trim() || "/";
  if (value === "/") return "/";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

export function isAppPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === APP_PATH || path.startsWith(`${APP_PATH}/`);
}

function legacyAppQuery(search: string): string | null {
  const params = new URLSearchParams(search);
  if (!params.has("tab") && !params.has("intent")) return null;
  params.delete("landing");
  params.delete("app");
  const query = params.toString();
  return query ? `${APP_PATH}?${query}` : APP_PATH;
}

export function resolveRoute({
  pathname,
  search = "",
  studioPreview = false,
}: {
  pathname: string;
  search?: string;
  studioPreview?: boolean;
}): RouteResolution {
  const path = normalizePathname(pathname);
  if (isAppPath(path)) return { surface: "app" };

  const params = new URLSearchParams(search);
  if (path === "/" && params.get("app") === "1") {
    return { surface: "app" };
  }

  // Keep old bookmarks such as `/?tab=activity` working. Studio previews are
  // intentionally exempt so the landing page remains visible at the root.
  if (path === "/" && !studioPreview && !params.has("landing")) {
    const replaceTo = legacyAppQuery(search);
    if (replaceTo) return { surface: "app", replaceTo };
  }

  return { surface: "landing" };
}
