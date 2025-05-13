import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/defend-my-page/",
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        d: "d.html",
      },
    },
  },
});
