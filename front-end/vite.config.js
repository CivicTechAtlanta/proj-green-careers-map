/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/proj-green-careers-map/", // GitHub Pages project path
  server: { port: 4000 },
});
