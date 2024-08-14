export { isFileExist }

function isFileExist(fileList: File[], file: File) {
  return fileList.some(
    (_file) =>
      _file.lastModified === file.lastModified &&
      _file.name === file.name &&
      _file.size === file.size
  )
}
