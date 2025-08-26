module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/consistent-type-imports": "error",
        "no-console": ["warn", { allow: ["info", "warn", "error"] }]
    },
    ignorePatterns: ["dist/"]
};