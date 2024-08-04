import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import svgLogo from './Components/svgLogo.vue'
import 'virtual:uno.css'

interface EnhanceApp {
  app: App
}
export default {
  ...DefaultTheme,
  enhanceApp({ app }: EnhanceApp) {
    app.component('demoPreview', ElementPlusContainer)
    app.component('svgLogo', svgLogo)
  },
}
