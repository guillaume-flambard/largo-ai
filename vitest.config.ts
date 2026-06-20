import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    // Loaders and dictionaries run server-side; no DOM needed.
    environment: "node",
  },
  resolve: {
    // Mirror the `@/*` alias from tsconfig so tests resolve project imports.
    alias: { "@": resolve(root) },
  },
});
