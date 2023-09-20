import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import VitePluginAjna from "./src/vite-plugin-simpleanalytics";

const config = () => {
  return defineConfig({
    plugins: [react(), VitePluginAjna()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
  });
};

export default config;
