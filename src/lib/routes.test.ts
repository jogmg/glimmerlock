import { describe, expect, it } from "vitest";
import { isAppPath, normalizePathname, resolveRoute } from "./routes";

describe("public/app route resolution", () => {
  it("serves the landing page at the root", () => {
    expect(resolveRoute({ pathname: "/" }).surface).toBe("landing");
  });

  it("serves the landing page at the root in Studio preview too", () => {
    expect(
      resolveRoute({ pathname: "/", search: "?studioPreview=1", studioPreview: true })
        .surface
    ).toBe("landing");
  });

  it("serves the app at /app and nested app paths", () => {
    expect(resolveRoute({ pathname: "/app" }).surface).toBe("app");
    expect(resolveRoute({ pathname: "/app/" }).surface).toBe("app");
    expect(resolveRoute({ pathname: "/app/activity" }).surface).toBe("app");
    expect(isAppPath("/app")).toBe(true);
    expect(isAppPath("/application")).toBe(false);
  });

  it("allows the Studio preview escape hatch without changing the root", () => {
    expect(
      resolveRoute({ pathname: "/", search: "?app=1", studioPreview: true }).surface
    ).toBe("app");
  });

  it("moves legacy root tab and intent links to /app with their query", () => {
    expect(resolveRoute({ pathname: "/", search: "?tab=activity" })).toEqual({
      surface: "app",
      replaceTo: "/app?tab=activity",
    });
    expect(
      resolveRoute({ pathname: "/", search: "?intent=int_abc&tab=overview" })
    ).toEqual({
      surface: "app",
      replaceTo: "/app?intent=int_abc&tab=overview",
    });
  });

  it("does not redirect Studio previews or explicit landing links", () => {
    expect(
      resolveRoute({
        pathname: "/",
        search: "?tab=activity",
        studioPreview: true,
      }).surface
    ).toBe("landing");
    expect(
      resolveRoute({ pathname: "/", search: "?tab=activity&landing=1" }).surface
    ).toBe("landing");
  });

  it("keeps unknown paths on the landing surface", () => {
    expect(resolveRoute({ pathname: "/unknown" }).surface).toBe("landing");
  });

  it("normalizes trailing slashes but preserves the root", () => {
    expect(normalizePathname("")).toBe("/");
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("/app/")).toBe("/app");
    expect(normalizePathname("app")).toBe("/app");
  });
});
