import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  jsx: true,
  rules: {
    'ts/ban-ts-comment': 'off',
  },
})
