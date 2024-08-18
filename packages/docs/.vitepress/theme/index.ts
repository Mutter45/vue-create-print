import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import 'virtual:uno.css'
import './styles/var.css'

interface EnhanceApp {
  app: App
}
export default {
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceApp) {
    app.component('demoPreview', ElementPlusContainer)
  },
}
