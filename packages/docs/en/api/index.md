# API

The API for function-based and component-based usage have the same parameters, but the usage methods are different. Component-based usage includes specific details on slots.

## Function (Parameters) & Component (Component Properties)

| Option | Type | Description |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`content`** | `() => HTMLElement \| string  \| MaybeRef<HTMLElement \| undefined>` | A ref pointing to the content to be printed or a string that can be obtained using querySelector. Alternatively, pass a ref or a string directly to the callback returned by `createPrint` |
| **`bodyClass?`** | `string` | One or more class names to pass to the print window, separated by spaces |
| **`documentTitle?`** | `string` | Set the title for printing when saving as a file. Ignored when passing a custom `print` option |
| **`fonts?`** | `{ family: string, source: string; weight?: string; style?: string; }[]` | A list of fonts to load into the printing iframe. This is useful if you are using custom fonts |
| **`ignoreGlobalStyles?`** | `boolean` | Ignore all `<style>` and `<link type="stylesheet" />` tags from `<head>` |
| **`nonce?`** | `string` | Set the [`nonce`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) attribute for allow-listing script and style elements for Content Security Policy (CSP) |
| **`onAfterPrint?`** | `() => void` | Callback function that triggers after the print dialog is closed _regardless of if the user selected to print or cancel_ |
| **`onBeforePrint?`** | `() => Promise<void>` | Callback function that triggers before print. This can be used to change the content on the page before printing as an alternative to, or in conjunction with `@media print` queries |
| **`onPrintError?`** | `(errorLocation: 'onBeforePrint' \| 'print', error: Error) => void` | Called if there is a printing error serious enough that printing cannot continue. Currently limited to Promise rejections in `onBeforePrint`, and `print`. Use this to attempt to print again. `errorLocation` will tell you where the Promise was rejected |
| **`pageStyle?`** | `string` | `react-to-print` sets some basic styles to help improve page printing, notably, removing the header and footer that most browsers add. Use this to override these styles and provide your own |
| **`preserveAfterPrint?`** | `boolean` | Remove the iframe after printing. NOTE: `onAfterPrint` will run before the iframe is removed |
| **`print?`** | `(iframe: HTMLIFrameElement) => Promise<void>` | If passed, this function will be used instead of `window.print` to print the content. Use this to print in non-browser environments such as Electron |
| **`suppressErrors?`** | `boolean` | When passed, prevents `console` logging of errors |

## Component Slots 

| 名称 | 参数 | 说明 |
| :-------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`default`** | (props:{handlePrint: () => void}) | Default slot used to consume the print functionality. |
| **`content`** | () | Slot for passing the content node to be printed. Note: When the `content` attribute is passed to the component, the slot takes precedence over the attribute. |

## Types

```ts
/**
 * Fonts to load into the print iframe
 */
 FontOption {
   family: string
   source: string
   weight?: string
   style?: string
 }
 /**
  * Content to be printed
  */
  content: () => HTMLElement | string | MaybeRef<HTMLElement | undefined>
  /**
   * One or more class names to pass to the print window, separated by spaces
   */
  bodyClass?: string
  /**
   * Set the title for printing when saving as a file
   */
  documentTitle?: string
  /**
   * You may optionally provide a list of fonts which will be loaded into the printing iframe.
   * This is useful if you are using custom fonts
   */
  fonts?: FontOption[]
  /**
   * Set the nonce attribute for whitelisting script and style -elements for CSP (content security policy)
   */
  nonce?: string
  /**
   * Callback function to trigger after print
   */
  onAfterPrint?: () => void
  /**
   * Callback function to trigger before print Callback function to trigger before page content is retrieved for printing
   */
  onBeforePrint?: () => Promise<any>
  /**
   * Callback function to listen for printing errors
   */
  onPrintError?: (errorLocation: "onBeforePrint" | "print", error: Error) => void
  /**
   * Override default print window styling
   */
  pageStyle?: string | (() => string)
  /**
   * Override the default `window.print` method that is used for printing
   */
  print?: (target: HTMLIFrameElement) => Promise<any>
  /**
   * Remove the iframe after printing.
   * NOTE: `onAfterPrint` will run before the iframe is removed
   */
  preserveAfterPrint?: boolean
  /**
   * Suppress error messages
   */
  suppressErrors?: boolean
```
