import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { VitePWA } from "vite-plugin-pwa";

const game = process.env.GAME || "demo";

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    {
      name: "game-entry",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return html.replace("__GAME__", game);
        },
      },
    },
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Novelty",
        short_name: "Novelty",
        display: "fullscreen",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,wasm}"],
      },
    }),
  ],
});
