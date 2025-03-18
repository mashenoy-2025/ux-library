import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "parens-division",
        javascriptEnabled: true,
        relativeUrls: true,
      },
    },
  },
  test: {
    globals: true,
    // run tests in jsdom environment
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
