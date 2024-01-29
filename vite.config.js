import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { VitePluginRadar } from "vite-plugin-radar";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const config = () => {
  return defineConfig({
    plugins: [
      react(),
      VitePluginRadar({
        simpleanalytics: {
          enabled: true,
          hostname: "ajna.blockanalitica.com",
        },
      }),

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
    build: {
      sourcemap: true,
    },
  });
};

export default config;
