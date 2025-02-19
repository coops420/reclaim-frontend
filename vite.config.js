import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node"; // Correct polyfill plugin

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({ include: ["buffer"] }), // Ensures Buffer works
  ],
  resolve: {
    alias: {
      buffer: "buffer/",
    },
  },
  define: {
    "process.env": {}, // Fixes missing process.env
  },
});
