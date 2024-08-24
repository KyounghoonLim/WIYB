export { measureTextWidth }

function measureTextWidth(text: string, font: string = '16px Inter') {
  if (!globalThis['window']) return
  else {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = font
    return ctx.measureText(text).width
  }
}
