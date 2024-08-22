export function labelGenerator(labels: string | string[]) {
  console.log(labels, typeof labels)
  if (typeof labels === 'string') return labels
  else {
    return labels.map((label, idx) => {
      switch (idx) {
        case 0:
          return label
        case 1:
          return '<span style="font-weight:bold;">' + label + '</span>'
        // return `<p style="font-weight:bold; color:#00871E; padding: 3.5px 6.5px; background-color:#E5F3E8; border-radius: 4px;">${label}</p>`
      }
    })
  }
}
