import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// const TRY_MOVE_STYLES_DELAY = 750 as const
// console.log(process.env.NODE_ENV)
// const isProd = process.env.NODE_ENV === 'production'
// const isDev = process.env.NODE_ENV === 'development'
// const isTest = process.env.NODE_ENV === 'test'

export default defineConfig({
  plugins: [
    vue(),
    // visualizer({
    //   filename: 'dist/stats.html',
    // }),

    dts({
      tsconfigPath: './tsconfig.json',
    }),
  ],

  build: {
    outDir: 'dist',
    minify: false,
    cssCodeSplit: true,
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'vueCreatePrint',
      fileName: 'index',
      formats: ['es', 'umd', 'cjs', 'iife'],
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
        // assetFileNames: (chunkInfo) => {
        //   console.log(chunkInfo.name)
        // },
        // manualChunks(id) {
        //   console.log(id, '============')
        // },
      },
    },
  },
})
