import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build mode: set PAGES_BUILD=1 and PAGES_BASE_PATH="/<repo-name>"
// (the workflow derives it from GITHUB_REPOSITORY). Unset locally => normal config.
const isPages = !!process.env.PAGES_BUILD;
const pagesBase = isPages
  ? (process.env.PAGES_BASE_PATH || "/").replace(/\/+$/, "") || "/"
  : "";

// Every route the app can show; each gets a prerendered HTML file on Pages.
const pagesRoutes = [
  "/",
  "/station/activity",
  "/station/precipitates",
  "/station/products",
  "/station/properties",
  "/final",
  "/reference",
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isPages
      ? {
          router: { basepath: pagesBase },
          client: { base: pagesBase },
          pages: pagesRoutes.map((path) => ({ path })),
        }
      : {}),
  },
  ...(isPages
    ? {
        vite: { base: pagesBase },
        nitro: { preset: "static" },
      }
    : {}),
});
