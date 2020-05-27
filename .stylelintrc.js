module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    // at-rule-no-unknown: 屏蔽一些scss等语法检查
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'extend', 'content']
      }
    ],
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'at-rule-no-unknown':null,
    'selector-pseudo-class-no-unknown':null,
    'property-no-unknown':null,
    'property-no-unknown':null,
    'order/properties-order':null
  }
}
