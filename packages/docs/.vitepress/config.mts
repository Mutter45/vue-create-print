import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import sidebar from './config/sidebar'
import viteConfig from './config/viteConfig'

export default defineConfig({
  title: 'vue-create-print',
  description: 'web print for Vue2 and Vue3',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/vue-create-print/logo.svg' }],
  ],
  locales: {
    root: {
      lang: 'zh-CN',
      label: '简体中文',
      themeConfig: {
        docFooter: {
          prev: '上一篇',
          next: '下一篇',
        },
        nav: [
          { text: '指南', link: '/guide/' },
          { text: 'API', link: '/api/' },
        ],
      },
    },
    en: {
      lang: 'en-US',
      label: 'English',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'API', link: '/en/api/' },
        ],
      },
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '',
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
  vite: viteConfig as any,
})
