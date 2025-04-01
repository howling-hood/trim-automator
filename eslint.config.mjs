import { defineConfig } from "eslint/config";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    ignores: ["**/build/", "**/data/", "**/dist/", "**/coverage/", "**/node_modules/"]
  },
  {
    files: ["./src/*.{js,mjs,cjs,jsx}", "./public/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: { ...globals.browser } }
  },
  {
    files: ["./app/*.{js,mjs,cjs,jsx}", "./common/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: { ...globals.node } }
  },
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended
]);
