import js from "@eslint/js";
import globals from "globals";
import promisePlugin from "eslint-plugin-promise";
import nodePlugin from "eslint-plugin-node";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      promise: promisePlugin,
      node: nodePlugin,
    },
    extends: [
      js.configs.recommended,
      nodePlugin.configs.recommended,
      promisePlugin.configs.recommended,
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      camelcase: "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
]);
