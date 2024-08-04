import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {},
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    fontFamily: {
      mono: 'var(--vt-font-family-mono)',
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
