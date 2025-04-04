import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4200,
    proxy: {
      "/api": {
        target: "https://ecommerce.zerobytetools.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
