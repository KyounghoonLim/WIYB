export { measureTextWidth }

function measureTextWidth(text: string, font: string = '16px Inter') {
  if (!globalThis['window']) return 0
  else {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = font
    return ctx.measureText(text).width
  }
}
