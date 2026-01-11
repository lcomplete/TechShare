import { defaultTheme } from '@vuepress/theme-default'

export default (options = {}) => ({
  name: 'local-theme',
  extends: defaultTheme(options)
})
