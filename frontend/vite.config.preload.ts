import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist-electron/preload",
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "app/preload/preload.cts"),
      formats: ["cjs"],
      fileName: () => "preload.cjs",
    },
    rollupOptions: {
      external: ["electron"],
    },
  },
});
