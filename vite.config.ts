import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";
// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../YourDotNetApp/wwwroot",
  },
  server: {
    port: 4200,
  },
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
