module.exports = {
    root: true,
    // 代码的宿主运行环境
    env: {
        browser: true,
        node: true,
        "vue/setup-compiler-macros": true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaFeatures: {
            tsx: true,
        },
    },
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "@typescript-eslint/no-empty-interface": ["error"],
        "@typescript-eslint/no-non-null-assertion": ["off"],
        "@typescript-eslint/consistent-type-imports": ["error"],
        "vue/singleline-html-element-content-newline": ["off"],
        "vue/html-self-closing": ["off"]
    },
    globals: {
        PRODUCTION: "readonly",
    },
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:vue/vue3-recommended"],
};
