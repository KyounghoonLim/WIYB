export { numberAddComma }

function numberAddComma(number: number, max?: number): string {
  if (number < 1) return '0'
  else if (max && number > max) return '+' + numberAddComma(max, max)
  else {
    const numList = []
    for (let num = number; num > 0; num = Math.floor(num / 1000)) {
      if (num < 10) numList.push(num)
      else numList.push(num % 1000)
    }
    return numList.reverse().join(',')
  }
}
