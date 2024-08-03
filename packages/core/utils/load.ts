export function loadImg(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = (_event, _source, _lineno, _colno, error) => reject(error)
  })
}
export function loadImgNode(imgNode: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    const imgSrc = imgNode.getAttribute('src')
    if (!imgSrc) {
      reject(new Error('Found an <img> tag with an empty "src" attribute. This prevents pre-loading it. '))
      return
    }
    loadImg(imgSrc).then(resolve).catch(reject)
  })
}
export function loadVideoNode(videoNode: HTMLVideoElement) {
  return new Promise((resolve, reject) => {
    videoNode.preload = 'auto' // Hint to the browser that it should load this resource

    const videoPoster = videoNode.getAttribute('poster')
    if (videoPoster) {
      loadImg(videoPoster).then(resolve).catch(reject)
    }
    else {
      if (videoNode.readyState >= 2) { // Check if the video has already loaded a frame
        resolve(videoNode)
      }
      else {
        videoNode.onloadeddata = () => resolve(videoNode)

        // TODO: why do `onabort` and `onstalled` seem to fire all the time even if there is no issue?
        // videoNode.onabort = () => markLoaded(videoNode, ["Loading video aborted", videoNode]);
        videoNode.onerror = (_event, _source, _lineno, _colno, error) => reject(error)
        videoNode.onstalled = () => reject(new Error('Loading video stalled, skipping'))
      }
    }
  })
}
