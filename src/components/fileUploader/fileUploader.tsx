"use client";

import { FileUploaderProps } from "@/src/@types/components/fileUploader/fileUploader.interface";
import clsx from "clsx";
import Image from "next/image";
import React, { ChangeEvent, SyntheticEvent, useCallback, useLayoutEffect, useRef, useState } from "react";

export default function FileUploader({ file, onUpload, id, className }: FileUploaderProps) {
  const { current: defaultImage } = useRef<string>("/images/image_default_profile.png");
  const { current: limitFileSize } = useRef<number>(5 * 1024 * 1024);
  const inputRef = useRef<HTMLInputElement>();
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);

  const changeHandler = useCallback(
    (e: ChangeEvent) => {
      const file = (e.target as HTMLInputElement).files[0];
      if (!file) return;
      else if (file.size > limitFileSize) {
        inputRef.current.files = null;
        inputRef.current.value = null;
        window.alert("파일 사이즈가 너무 큽니다.\n파일은 5MB 이하만 가능합니다.");
      } else onUpload(file);
    },
    [onUpload]
  );

  const removeClickHandler = useCallback(() => {
    onUpload(null);
  }, []);

  useLayoutEffect(() => {
    if (!file) {
      setImageUrl(defaultImage);
    } else if (typeof file === "string") {
      setImageUrl(file);
    } else {
      setImageUrl(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <label className={clsx("file-uploader", className)} htmlFor={id || "file-uploader-input"}>
      <Image src={imageUrl} alt="" width={100} height={100} quality={100} priority />
      <input ref={inputRef} type="file" id={id || "file-uploader-input"} onChange={changeHandler} accept="image/*" />
    </label>
  );
}
