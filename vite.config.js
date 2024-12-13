import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Set to `false` if you want to disable source maps
  },
  css: {
    devSourcemap: true,
  },
});
