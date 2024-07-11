import { defineComponent, inject, provide, toRaw, toRefs } from 'vue'
import { createPrint } from './createPrint'
import type { PrintProp } from './types/index'

const props = [
  'bodyClass',
  'content',
  'copyStyles',
  'documentTitle',
  'fonts',
  'nonce',
  'onAfterPrint',
  'onPrintError',
  'pageStyle',
  'print',
  'removeAfterPrint',
  'suppressErrors',
  'trigger',
  'show',
] as const
export const VueToPrint = defineComponent({
  name: 'VueToPrint',
  props: props as unknown as any,
  setup(props, { slots }) {
    const { show } = toRefs(props)
    // eslint-disable-next-line no-console
    console.log(props, show, toRaw(props))
    const handlePrint = createPrint(toRaw(props) as PrintProp)
    provide('handlePrint', handlePrint)

    return () => (
      [
        slots.default ? slots.default() : null,
        (slots.content && show.value) ? slots.content() : null,
      ]
    )
  },
})
export const PrintContextConsumer = defineComponent({
  name: 'PrintContextConsumer',
  setup(_, { slots }) {
    const handlePrint = inject<() => void>('handlePrint')
    return () => (
      slots.default
        ? slots.default({
          handlePrint,
        })
        : null
    )
  },
})
