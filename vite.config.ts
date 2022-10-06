import { resolve } from 'path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      fileName: "main",
      name: "@anichart/remotion",
    },
    rollupOptions: {
      external: ["react", "react-dom", "anichart", "remotion"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "anichart": "anichart",
          "remotion": "remotion"
        },
      },
    },
    target: "modules",
  },
  plugins: [react(), dts()],
});
