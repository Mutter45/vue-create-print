import { resolve } from 'node:path'
import { defineConfig } from 'vite'
// import { visualizer } from 'rollup-plugin-visualizer'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    // visualizer({
    //   filename: 'dist/stats.html',
    // }),

    dts({
      tsconfigPath: './tsconfig.json',
      beforeWriteFile: (filePath, content) => {
        const _content = content.replace(/vue-demi/g, 'vue')
        return {
          filePath,
          content: _content,
        }
      },
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
