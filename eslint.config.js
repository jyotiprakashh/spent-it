// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      'no-restricted-imports': [
        'error',
        { paths: ['axios', 'node-fetch', 'cross-fetch'] },
      ],
    },
  },
  {
    ignores: ['dist/*', 'node_modules/', '.expo/', 'scripts/'],
  },
]);
