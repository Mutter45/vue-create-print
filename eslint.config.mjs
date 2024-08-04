import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: [
      '**/types',
      '**/cache',
      '**/dist',
      '**/.temp',
      '**/*.svg',
      '**/*.md',
    ],
  },
  {
    rules: {
      'vue/no-deprecated-functional-template': 'off',
      'vue/one-component-per-file': 'off',
      'vue/no-template-shadow': 'off',
      'vue/require-prop-types': 'off',
      'spaced-comment': ['error', 'always', { exceptions: ['#__PURE__'] }],
      'ts/ban-types': 'off',
      'node/no-callback-literal': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'node/prefer-global/process': 'off',
      'ts/unified-signatures': 'off',
      'ts/no-dynamic-delete': 'off',
    },
  },
  {
    files: [
      '**/*.demo.vue',
    ],
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-restricted-imports': 'off',
      'vue/no-unused-vars': 'off',
      'vue/no-unused-refs': 'off',
      'vue/require-v-for-key': 'off',
      'ts/no-unused-vars': 'off',
      'ts/no-redeclare': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
)
