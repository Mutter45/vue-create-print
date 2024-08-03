import type { MaybeRef } from "vue"
export interface FontOption {
  family: string
  source: string
  weight?: string
  style?: string
}
export interface PrintProp {
  /**
   * One or more class names to pass to the print window, separated by spaces
   */
  bodyClass?: string
  /**
   * Content to be printed
   */
  content:() => HTMLElement | string | MaybeRef<HTMLElement | undefined>
  /**
   * Copy all <style> and <link type="stylesheet" /> tags from <head> inside the parent window into the print window.
   * (default: true)
   */
  copyStyles?: boolean
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
   * Callback function to trigger before page content is retrieved for printing
   */
  onBeforeGetContent?: () => void | Promise<any>
  /**
   * Callback function to trigger before print
   */
  onBeforePrint?: () => void | Promise<any>
  /**
   * Callback function to listen for printing errors
   */
  onPrintError?: (errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void
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
  removeAfterPrint?: boolean
  /**
   * Suppress error messages
   */
  suppressErrors?: boolean
  /**
   * Trigger action used to open browser print Deprecated
   */
  // trigger?: (handlePrint: () => void) => void
}
declare global {
  interface Document {
    fonts: FontFaceSet; // https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
  }

  interface Window {
    FontFace: FontFace; // https://developer.mozilla.org/en-US/docs/Web/API/FontFace
  }

  interface FontFaceSet extends Iterable<FontFace> {
    add(font: FontFace): void; // https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/add
  }
}
