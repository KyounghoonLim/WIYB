export { isNull, exceptNull }

function isNull(condition) {
  return condition == null
}

function exceptNull(obj: object) {
  try {
    return Object.keys(obj).reduce((prev, key) => {
      if (isNull(obj[key])) return prev
      else return { ...prev, [key]: obj[key] }
    }, {})
  } catch {
    return null
  }
}
