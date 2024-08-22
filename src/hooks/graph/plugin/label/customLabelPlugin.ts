const textAlign = 'center' as const
const font = ['normal 12px Inter', 'normal bold 12px Inter'] as const
const textColor = ['black', '#00871E'] as const
const backgroundColor = '#E5F3E8' as const
const padding = { x: 6, y: 2.5 } as const
const height = 12 as const
const lineHeight = 14.52 as const
const margin = 4 as const

export const customLabelPlugin = {
  id: 'customLabelPlugin',
  afterRender: (chart) => {
    const {
      ctx,
      scales: { r },
    }: { ctx: CanvasRenderingContext2D; scales: any } = chart
    ctx.save()

    const edges = r._pointLabels.length
    const halfNum = edges / 2
    const isOdd = Boolean(edges % 2)
    const bottomPosIndex = isOdd ? [Math.floor(halfNum), Math.ceil(halfNum)] : [halfNum]

    // 각 축에 대해 반복
    r._pointLabels.forEach((labels, index) => {
      const isBottom = bottomPosIndex.includes(index)

      const angle = r.getIndexAngle(index)
      const x = r.xCenter + r.drawingArea * 1.4 * Math.sin(angle) // 위치 조정
      const y = r.yCenter - r.drawingArea * (isBottom ? 1.2 : index ? 1.3 : 1.4) * Math.cos(angle) // 위치 조정

      labels.forEach((label, idx) => {
        if (idx) {
          const { width } = ctx.measureText(label)

          ctx.fillStyle = backgroundColor
          const path = new Path2D()
          path.roundRect(
            x - padding.x - width / 2,
            y - padding.y - height / 1.5,
            width + padding.x * 2,
            lineHeight + padding.y * 2,
            4
          )
          ctx.fill(path)
        }
        ctx.textAlign = textAlign
        ctx.textBaseline = 'middle'
        ctx.font = font[idx]
        ctx.fillStyle = textColor[idx]

        const textY = y + (lineHeight + margin) * (1 - idx)
        console.log(index, 'text y', textY)
        ctx.fillText(label, x, textY)
      })
    })

    ctx.restore()
  },
}
