import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import sidebar from './config/sidebar'
export default defineConfig({
  title: 'vue-to-print',
  description: 'web print for Vue',


  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },

    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mutter45/vue-create-print' },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
