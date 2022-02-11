// https://stylelint.io/user-guide/rules/list 文档

module.exports = {
    "extends": ["stylelint-config-standard"],
    "plugins": ["stylelint-scss"],
    "rules": {
        // 未知的scss规则禁止使用，null表明将该规则关闭
        "at-rule-no-unknown": null,
        // 禁止使用的scss规则列表
        "at-rule-disallowed-list": ["import"],
        "at-rule-empty-line-before": null,
        "block-no-empty": null,
        "color-no-invalid-hex": true,
        "declaration-colon-space-after": "always",
        "indentation": ["tab", {
          "except": ["value"]
        }],
        "max-empty-lines": 2,
        "rule-empty-line-before": [ "always", {
          "except": ["first-nested"],
          "ignore": ["after-comment"]
        } ]
      }
}
