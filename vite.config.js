import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const routeTreeRelativePath = "src/routeTree.gen.js";
const routeTreePath = path.resolve(process.cwd(), routeTreeRelativePath);

function cleanRouteTreeSource(code) {
  return code.replace(/\nimport type [\s\S]*$/, "\n");
}

function isRouteTreeFile(id) {
  return id.replace(/\\/g, "/").endsWith(`/${routeTreeRelativePath}`);
}

function readRouteTreeFromDisk() {
  if (!fs.existsSync(routeTreePath)) {
    return null;
  }

  return fs.readFileSync(routeTreePath, "utf8");
}

function stripRouteTreeTypes() {
  let lastCleanedContent = readRouteTreeFromDisk()
    ? cleanRouteTreeSource(readRouteTreeFromDisk())
    : null;

  return {
    name: "strip-route-tree-types",
    enforce: "pre",
    load(id) {
      if (!isRouteTreeFile(id)) {
        return null;
      }

      const code = fs.readFileSync(id, "utf8");
      const cleaned = cleanRouteTreeSource(code);
      lastCleanedContent = cleaned;
      return cleaned;
    },
    handleHotUpdate({ file }) {
      if (path.resolve(file) !== routeTreePath) {
        return;
      }

      const code = fs.readFileSync(routeTreePath, "utf8");
      const cleaned = cleanRouteTreeSource(code);

      if (cleaned === lastCleanedContent) {
        return [];
      }

      lastCleanedContent = cleaned;
    },
  };
}

const routeTreeEsbuildPlugin = {
  name: "strip-route-tree-types-esbuild",
  setup(build) {
    build.onLoad({ filter: /routeTree\.gen\.js$/ }, async (args) => {
      const contents = cleanRouteTreeSource(await fs.promises.readFile(args.path, "utf8"));
      return { contents, loader: "js" };
    });
  },
};

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [routeTreeEsbuildPlugin],
    },
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./jsconfig.json"] }),
    ...tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      router: {
        generatedRouteTree: "routeTree.gen.js",
        disableTypes: true,
      },
    }),
    nitro({ preset: "vercel" }),
    react(),
    stripRouteTreeTypes(),
  ],
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
