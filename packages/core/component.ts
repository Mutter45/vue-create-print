import type { VNode } from 'vue-demi'
import { defineComponent, toRaw } from 'vue-demi'
import { createPrint } from './createPrint'
import type { PrintProp } from './types/index'
import { createLogMessages, createPrintId } from './utils'

const props = [
  'bodyClass',
  'content',
  'documentTitle',
  'fonts',
  'nonce',
  'onAfterPrint',
  'onBeforePrint',
  'onPrintError',
  'pageStyle',
  'print',
  'preserveAfterPrint',
  'suppressErrors',
] as const

export const VueCreatePrint = defineComponent({
  name: 'VueCreatePrint',
  props: props as unknown as any,
  setup(props, { slots }) {
    const logMessages = createLogMessages()
    const printId = createPrintId()
    const rawProps = toRaw(props) as unknown as PrintProp
    if (slots.content) {
      rawProps.content = () => `[data-print-id="${printId}"]`
    }

    const getModifiedContent = (content?: VNode[]) => {
      if (Number(content?.length) > 1) {
        logMessages(['Multiple root tags appear,only the content of the first root tag will be printed.'])
      }
      return content?.map((vNode) => {
        vNode.props = { ...vNode.props, 'data-print-id': printId }
        return vNode
      })
    }
    const handlePrint = createPrint(rawProps)
    return () => {
      return Object.keys(slots).map((it) => {
        let vNode: VNode[] | undefined
        if (it === 'default') {
          vNode = slots[it]?.({
            handlePrint,
          })
        }
        if (it === 'content') {
          vNode = getModifiedContent(slots[it]?.())
        }
        return vNode
      })
    }
  },
})
