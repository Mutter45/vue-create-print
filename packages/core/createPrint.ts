import { toValue } from 'vue-demi'
import { delay, isFunction, isString, merge } from 'lodash-es'
import { createLogMessages, isPromise, loadImgNode, loadVideoNode, throwError } from './utils'
import { defaultProps } from './constant'
import type { FontOption, PrintProp } from './types/index'

export function createPrint(
  props: PrintProp,
) {
  const {
    bodyClass,
    content,
    documentTitle,
    fonts,
    nonce,
    onAfterPrint,
    onBeforePrint,
    onPrintError,
    pageStyle,
    print,
    suppressErrors,
    removeAfterPrint,
  }
    = merge({}, defaultProps, props)
  const logMessages = createLogMessages(suppressErrors)
  const getContent = () => {
    if (!isFunction(content)) {
      throwError('The "content" prop must be a function.')
    }
    const _el = toValue(content())
    if (!_el) {
      throwError('Please ensure "content" is renderable before allowing "vue-create-print" to be called.')
    }
    if (isString(_el)) {
      const _selectEl = document.querySelector(_el)
      if (!_selectEl) {
        throwError('Please ensure "content" is renderable before allowing "vue-create-print" to be called.')
      }
      return _selectEl as HTMLElement
    }

    return _el as HTMLElement
  }
  const handleRemoveIframe = (force?: boolean) => {
    if (force || removeAfterPrint) {
      // The user may have removed the iframe in `onAfterPrint`
      const documentPrintWindow = document.getElementById('printWindow')
      if (documentPrintWindow) {
        document.body.removeChild(documentPrintWindow)
      }
    }
  }

  const startPrint = (target: HTMLIFrameElement) => {
    // Some browsers such as Safari don't always behave well without this timeout
    delay(() => {
      if (target.contentWindow) {
        target.contentWindow.focus() // Needed for IE 11

        if (print) {
          print(target)
            .then(() => onAfterPrint?.())
            .then(() => handleRemoveIframe())
            .catch((error: Error) => {
              if (onPrintError) {
                onPrintError('print', error)
              }
              else {
                logMessages(['An error was thrown by the specified `print` function'])
              }
            })
        }
        else {
          if (target.contentWindow.print) {
            const tempContentDocumentTitle = target.contentDocument?.title ?? ''
            const tempOwnerDocumentTitle = target.ownerDocument.title

            // Override page and various target content titles during print
            // NOTE: some browsers seem to take the print title from the highest level
            // title, while others take it from the lowest level title. So, we set the title
            // in a few places and hope the current browser takes one of them :pray:
            if (documentTitle) {
              // Print filename in Chrome
              target.ownerDocument.title = documentTitle

              // Print filename in Firefox, Safari
              if (target.contentDocument) {
                target.contentDocument.title = documentTitle
              }
            }

            target.contentWindow.print()

            // Restore the page's original title information
            if (documentTitle) {
              target.ownerDocument.title = tempOwnerDocumentTitle

              if (target.contentDocument) {
                target.contentDocument.title = tempContentDocumentTitle
              }
            }
          }
          else {
            // Some browsers, such as Firefox Android, do not support printing at all
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/print
            logMessages(['Printing for this browser is not currently possible, the browser does not have a `print` method available for iframes.'])
          }

          onAfterPrint?.()
          handleRemoveIframe()
        }
      }
      else {
        logMessages(['Printing failed because the \'contentWindow\' of the print iframe is not loaded. This may be an internal error.'])
      }
    }, 500)
  }
  const handlePrint = () => {
    const contentEl = getContent()
    const printWindow = document.createElement('iframe')
    printWindow.width = `${document.documentElement.clientWidth}px`
    printWindow.height = `${document.documentElement.clientHeight}px`
    printWindow.style.position = 'absolute'
    printWindow.style.top = `-${document.documentElement.clientHeight + 100}px`
    printWindow.style.left = `-${document.documentElement.clientWidth + 100}px`
    printWindow.id = 'printWindow'
    // Ensure we set a DOCTYPE on the iframe's document
    printWindow.srcdoc = '<!DOCTYPE html>'

    const clonedContentNodes = contentEl.cloneNode(true)
    const globalLinkNodes = document.querySelectorAll('link[rel~=\'stylesheet\'], link[as=\'style\']')
    const renderComponentImgNodes = (clonedContentNodes as Element).querySelectorAll('img')
    const renderComponentVideoNodes = (clonedContentNodes as Element).querySelectorAll('video')

    const numFonts = fonts ? fonts.length : 0
    const numResourcesToLoad
      = globalLinkNodes.length
      + renderComponentImgNodes.length
      + renderComponentVideoNodes.length
      + numFonts
    const resourcesLoaded: (Element | FontOption | FontFace)[] = []

    const resourcesErrored: (Element | FontOption | FontFace)[] = []

    const markLoaded = (resource: Element | FontOption | FontFace, errorMessages?: unknown[]) => {
      if (resourcesLoaded.includes(resource)) {
        logMessages(['Tried to mark a resource that has already been handled', resource], 'debug')
        return
      }

      if (!errorMessages) {
        resourcesLoaded.push(resource)
      }
      else {
        logMessages([
          'Unable to load a resource but will continue attempting to print the page',
          ...errorMessages,
        ])
        resourcesErrored.push(resource)
      }

      // We may have errors, but attempt to print anyways - maybe they are trivial and the
      // user will be ok ignoring them
      const numResourcesManaged = resourcesLoaded.length + resourcesErrored.length

      if (numResourcesManaged === numResourcesToLoad) {
        startPrint(printWindow)
      }
    }

    printWindow.onload = () => {
      // Some agents, such as IE11 and Enzyme (as of 2 Jun 2020) continuously call the
      // `onload` callback. This ensures that it is only called once.
      printWindow.onload = null

      const domDoc = printWindow.contentDocument || printWindow.contentWindow?.document

      if (domDoc) {
        domDoc.body.appendChild(clonedContentNodes)

        if (fonts) {
          if (printWindow.contentDocument?.fonts && printWindow.contentWindow?.FontFace) {
            fonts.forEach((font) => {
              const fontFace = new FontFace(
                font.family,
                font.source,
                { weight: font.weight, style: font.style },
              )
              printWindow.contentDocument!.fonts.add(fontFace)
              fontFace.loaded
                .then(() => markLoaded(fontFace))
                .catch((error: Error) => {
                  markLoaded(fontFace, ['Failed loading the font:', fontFace, 'Load error:', error])
                })
            })
          }
          else {
            fonts.forEach(font => markLoaded(font)) // Pretend we loaded the fonts to allow printing to continue
            logMessages(['Unable to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page'])
          }
        }

        const defaultPageStyle = isFunction(pageStyle) ? pageStyle() : pageStyle

        if (!isString(defaultPageStyle)) {
          logMessages([`Expected a "string" from \`pageStyle\` but received "${typeof defaultPageStyle}". Styles from \`pageStyle\` will not be applied.`])
        }
        else {
          const styleEl = domDoc.createElement('style')
          if (nonce) {
            styleEl.setAttribute('nonce', nonce)
            domDoc.head.setAttribute('nonce', nonce)
          }
          styleEl.appendChild(domDoc.createTextNode(defaultPageStyle))
          domDoc.head.appendChild(styleEl)
        }

        if (bodyClass) {
          domDoc.body.classList.add(...bodyClass.split(' '))
        }

        // Copy canvases
        // NOTE: must use data from `contentEl` here as the canvass elements in
        // `clonedContentNodes` will not have been redrawn properly yet
        const srcCanvasEls = contentEl.querySelectorAll('canvas')
        const targetCanvasEls = domDoc.querySelectorAll('canvas')

        for (let i = 0; i < srcCanvasEls.length; ++i) {
          const sourceCanvas = srcCanvasEls[i]

          const targetCanvas = targetCanvasEls[i]
          const targetCanvasContext = targetCanvas.getContext('2d')

          if (targetCanvasContext) {
            targetCanvasContext.drawImage(sourceCanvas, 0, 0)
          }
        }

        // Pre-load images
        for (let i = 0; i < renderComponentImgNodes.length; i++) {
          const imgNode = renderComponentImgNodes[i]
          // https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
          loadImgNode(imgNode)
            .then(() => markLoaded(imgNode))
            .catch((error: Error) => {
              markLoaded(imgNode, ['Failed loading the img:', imgNode, 'Load error:', error])
            })
        }

        // Pre-load videos
        for (let i = 0; i < renderComponentVideoNodes.length; i++) {
          const videoNode = renderComponentVideoNodes[i]
          loadVideoNode(videoNode)
            .then(() => markLoaded(videoNode))
            .catch((error: Error) => {
              markLoaded(videoNode, ['Failed loading the video:', videoNode, 'Load error:', error])
            })
        }
        // Copy input values
        // This covers most input types, though some need additional work (further down)
        const inputSelector = 'input'
        const originalInputs = contentEl.querySelectorAll(inputSelector)
        const copiedInputs = domDoc.querySelectorAll(inputSelector)
        for (let i = 0; i < originalInputs.length; i++) {
          copiedInputs[i].value = originalInputs[i].value
        }

        // Copy checkbox, radio checks
        const checkedSelector = 'input[type=checkbox],input[type=radio]'
        const originalCRs = contentEl.querySelectorAll(checkedSelector)
        const copiedCRs = domDoc.querySelectorAll(checkedSelector)
        for (let i = 0; i < originalCRs.length; i++) {
          (copiedCRs[i] as HTMLInputElement).checked
            = (originalCRs[i] as HTMLInputElement).checked
        }

        // Copy select states
        const selectSelector = 'select'
        const originalSelects = contentEl.querySelectorAll(selectSelector)
        const copiedSelects = domDoc.querySelectorAll(selectSelector)
        for (let i = 0; i < originalSelects.length; i++) {
          copiedSelects[i].value = originalSelects[i].value
        }

        const styleAndLinkNodes = document.querySelectorAll('style, link[rel~=\'stylesheet\'], link[as=\'style\']')

        for (let i = 0, styleAndLinkNodesLen = styleAndLinkNodes.length; i < styleAndLinkNodesLen; ++i) {
          const node = styleAndLinkNodes[i]

          if (node.tagName.toLowerCase() === 'style') { // <style> nodes
            const newHeadEl = domDoc.createElement(node.tagName)
            const sheet = (node as HTMLStyleElement).sheet as CSSStyleSheet
            if (sheet) {
              let styleCSS = ''
              try {
                const cssLength = sheet.cssRules.length
                for (let j = 0; j < cssLength; ++j) {
                  if (typeof sheet.cssRules[j].cssText === 'string') {
                    styleCSS += `${sheet.cssRules[j].cssText}\r\n`
                  }
                }
              }
              catch (error: any) {
                logMessages([error.message], 'warning')
              }

              newHeadEl.setAttribute('id', `vue-create-print-${i}`)
              if (nonce) {
                newHeadEl.setAttribute('nonce', nonce)
              }
              newHeadEl.appendChild(domDoc.createTextNode(styleCSS))
              domDoc.head.appendChild(newHeadEl)
            }
          }
          else { // <link> nodes, and any others
            // Many browsers will do all sorts of weird things if they encounter an
            // empty `href` tag (which is invalid HTML). Some will attempt to load
            // the current page. Some will attempt to load the page"s parent
            // directory. These problems can cause `vue-create-print` to stop without
            // any error being thrown. To avoid such problems we simply do not
            // attempt to load these links.
            if (node.getAttribute('href')) {
              // Browser's don't display `disabled` `link` nodes, so we need to filter them out
              // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled
              // https://caniuse.com/mdn-html_elements_link_disabled
              // TODO: ideally we could just filter these out on selection using
              // a selector such as: `link[rel='stylesheet']:not([disabled])`
              // https://stackoverflow.com/questions/27733826/css-selectors-for-excluding-by-attribute-presence
              // However, that doesn't seem to work. Why?
              if (!node.hasAttribute('disabled')) {
                const newHeadEl = domDoc.createElement(node.tagName)

                // Manually re-create the node
                // TODO: document why cloning the node won't work? I don't recall
                // the reasoning behind why we do it this way
                // NOTE: node.attributes has NamedNodeMap type that is not an Array
                // and can be iterated only via direct [i] access
                for (let j = 0, attrLen = node.attributes.length; j < attrLen; ++j) {
                  const attr = node.attributes[j]
                  if (attr) {
                    newHeadEl.setAttribute(attr.nodeName, attr.nodeValue || '')
                  }
                }

                newHeadEl.onload = () => markLoaded(newHeadEl)
                newHeadEl.onerror = (_event, _source, _lineno, _colno, error) => markLoaded(newHeadEl, ['Failed to load', newHeadEl, 'Error:', error])
                if (nonce) {
                  newHeadEl.setAttribute('nonce', nonce)
                }
                domDoc.head.appendChild(newHeadEl)
              }
              else {
                logMessages(['Encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:', node], 'warning')
                // `true` because this isn't an error: we are intentionally skipping this node
                markLoaded(node)
              }
            }
            else {
              logMessages(['Encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:', node], 'warning')
              // `true` because we"ve already shown a warning for this
              markLoaded(node)
            }
          }
        }
      }
    }

    // Ensure we remove any pre-existing print windows before adding a new one
    handleRemoveIframe(true)

    document.body.appendChild(printWindow)
  }
  const handleClick = () => {
    const onBeforePrintOutput = onBeforePrint?.()
    if (isPromise(onBeforePrintOutput)) {
      onBeforePrintOutput
        .then(() => handlePrint())
        .catch((error: Error) => {
          if (onPrintError) {
            onPrintError('onBeforeGetContent', error)
          }
        })
    }
    else {
      logMessages(['The return value is not a `promise`, and the printed content may not be what you expect.'], 'warning')
      handlePrint()
    }
  }
  return handleClick
}
