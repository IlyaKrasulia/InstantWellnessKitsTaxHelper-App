import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Global ignores
    ignores: ["dist", "node_modules"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Apply this block to your source files
    files: ["**/*.{js,jsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        // Point to your jsconfig.json since you aren't using a tsconfig.json
        project: ["./jsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Standard JS unused vars rule
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "@typescript-eslint/no-unused-vars": "off",
      indent: ["error", 2],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: {
        ...globals.node, // This defines 'module', 'exports', 'require', etc.
      },
    },
  },
  {
    // Disable type-checking for config files so they don't look for a jsconfig
    files: ["eslint.config.js", "vite.config.js"],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      // Optional: you can turn off specific rules for config files here
    }
  }
);