module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': 'error'
  },
  'space-before-function-paren': 'off',
  '@typescript-eslint/space-before-function-paren': ['error'],
  '@typescript-eslint/consistent-type-definitions': 'off'
}
