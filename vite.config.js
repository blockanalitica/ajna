import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import VitePluginAjna from "./src/vite-plugin-simpleanalytics";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const config = () => {
  return defineConfig({
    plugins: [
      react(),
      VitePluginAjna(),
      // sentry plugin must be last!
      sentryVitePlugin({
        org: "block-analitica-doo",
        project: "ajna",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      sourcemap: true,
    },
  });
};

export default config;
