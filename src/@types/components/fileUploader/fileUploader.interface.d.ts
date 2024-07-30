export { FileUploaderProps };

interface FileUploaderProps {
  file: File | string;
  onUpload: React.Dispatch<File> | ((file: File) => any | Primise<any>);
  id?: string;
  className?: string;
}
