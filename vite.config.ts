import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath } from 'url';
import {URL} from "node:url";

export default defineConfig({
  resolve: {
    extensions: ["*", ".js", ".ts", ".vue", ".json"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  plugins: [vue( {
    script: {
      defineModel: true
    }
  }), svgLoader()],
});
