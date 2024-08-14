export { FileUploaderProps, FileListUploaderProps }

interface FileUploaderProps {
  file: File | string
  onUpload: React.Dispatch<File> | ((file: File) => any | Primise<any>)
  id?: string
  className?: string
}

interface FileListUploaderProps {
  fileList: Array<File | string>
  onUpload:
    | React.Dispatch<Array<File | string>>
    | ((fileList: Array<File | string>) => any | Primise<any>)
  id?: string
  className?: string
}
