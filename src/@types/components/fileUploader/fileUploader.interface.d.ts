export { FileUploaderProps, FileListUploaderProps };

interface FileUploaderProps {
  file: File | string;
  onUpload: React.Dispatch<File> | ((file: File) => any | Primise<any>);
  id?: string;
  className?: string;
}

interface FileListUploaderProps {
  fileList: File[] | string[];
  onUpload: React.Dispatch<File[]> | ((fileList: File[]) => any | Primise<any>);
  id?: string;
  className?: string;
}
