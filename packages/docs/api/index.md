
# API

函数式调用的 API 和组件式调用的 API 都有相同的参数，只是使用方式不同
组件式使用包含插槽的具体使用

## Function(入参) & Component (组件属性)

| 名称 | 类型 | 说明 |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`content`** | `() => HTMLElement \| string  \| MaybeRef<HTMLElement \| undefined>` | 指向要打印的内容的 ref 或可以使用 querySelector 获取的字符串。或者，将 ref 或字符串直接传递给 `createPrint` 返回的回调 |
| **`bodyClass?`** | `string` | 要传递到打印 `window(iframe)` 的一个或多个类名，用空格分隔 |
| **`documentTitle?`** | `string` | 设置另存为文件时要打印的标题。当传递 `print` 参数时失效 |
| **`fonts?`** | `{ family: string, source: string; weight?: string; style?: string; }[]` | 要加载到打印 `iframe` 中的字体列表。如果您使用自定义字体，这将非常有用 |
| **`ignoreGlobalStyles?`** | `boolean` | 忽略 `<head>` 中的所有 `<style>` 和 `<link type=“stylesheet” />` 标签 |
| **`nonce?`** | `string` |为内容安全策略 （CSP） 的允许列表脚本和样式元素设置 [`nonce`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/nonce) 属性 |
| **`onAfterPrint?`** | `() => void` | 在打印对话框关闭后触发的回调函数，无论用户是选择 `打印` 还是 `取消` |
| **`onBeforePrint?`** | `() => Promise<any>` | 在打印前触发的回调函数。这可用于在打印之前更改页面上的内容，作为打印查询的替代方法，或与 `@media print` 查询结合使用 |
| **`onPrintError?`** | `(errorLocation: 'onBeforePrint' \| 'print', error: Error) => void` | 如果打印错误严重到足以导致打印无法继续，则调用。目前仅限于 `onBeforePrint` 和 `print` 中的 **Promise** 拒绝。使用此选项可尝试再次打印。`errorLocation` 会显示处于那个回调函数内 |
| **`pageStyle?`** | `string` | `vue-create-print` 设置了一些基本样式来帮助改进页面打印，特别是删除大多数浏览器添加的页眉和页脚。使用它来覆盖这些样式并提供您自己的样式 |
| **`preserveAfterPrint?`** | `boolean` | 打印后删除 iframe,**`preserveAfterPrint`** 将在删除 iframe 之前运行  |
| **`print?`** | `(iframe: HTMLIFrameElement) => Promise<void>` | 使用此函数代替 `window.print` 来打印内容。使用它在非浏览器环境（如 Electron）中打印 |
| **`suppressErrors?`** | `boolean` | 默认值为 `false`, 传 `true`将阻止`console`记录错误 |

## Component Slots 插槽

| 名称 | 参数 | 说明 |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`default`** | (props:{handlePrint: () => void}) | 默认插槽，用于消费打印功能 |
| **`content`** | () | 用于传递要打印的内容节点 注意：当组件传递 `content` 属性时，插槽的优先级高于属性 |

## 类型

```ts
/**
 * 要加载到打印 iframe 中的字体
 */
 FontOption {
   family: string
   source: string
   weight?: string
   style?: string
 }
 /**
  * 要打印的内容
  */
  content: () => HTMLElement | string | MaybeRef<HTMLElement | undefined>
  /**
   * 传递给打印窗口的一个或多个类名，以空格分隔
   */
  bodyClass?: string
  /**
   * 保存为文件时设置打印的标题
   */
  documentTitle?: string
  /**
   * 您可以选择提供要加载到打印 iframe 中的字体列表。
   * 如果您使用自定义字体，这会很有用
   */
  fonts?: FontOption[]
  /**
   * 设置 nonce 属性以将脚本和样式元素列入 CSP（内容安全策略）白名单
   */
  nonce?: string
  /**
   * 打印后触发的回调函数
   */
  onAfterPrint?: () => void
  /**
   * 打印前触发的回调函数，打印前检索页面内容时触发的回调函数
   */
  onBeforePrint?: () => Promise<any>
  /**
   * 监听打印错误的回调函数
   */
  onPrintError?: (errorLocation: "onBeforePrint" | "print", error: Error) => void
  /**
   * 重写默认的打印窗口样式
   */
  pageStyle?: string | (() => string)
  /**
   * 重写用于打印的默认 `window.print` 方法
   */
  print?: (target: HTMLIFrameElement) => Promise<any>
  /**
   * 打印后删除 iframe。
   * 注意：`onAfterPrint` 将在 iframe 删除前运行
   */
  preserveAfterPrint?: boolean
  /**
   * 抑制错误消息
   */
  suppressErrors?: boolean

```
