export { ImageUploader_Multiple_Props }

interface ImageUploader_Multiple_Props {
  fileList: Array<File | string>
  onUpload:
    | React.Dispatch<Array<File | string>>
    | ((fileList: Array<File | string>) => any | Primise<any>)
  id?: string
  className?: string
}
