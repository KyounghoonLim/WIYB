'use client'

import { FileListUploaderProps } from '@/src/@types/components/fileUploader/fileUploader.interface'
import clsx from 'clsx'
import Image from 'next/image'
import React, { ChangeEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

export default function FileListUploader({
  fileList,
  onUpload,
  id,
  className,
}: FileListUploaderProps) {
  const { current: defaultImage } = useRef<string>('/images/image_default.png')
  const { current: limitFileSize } = useRef<number>(5 * 1024 * 1024)
  const inputRef = useRef<HTMLInputElement>()
  const [imageUrlList, setImageUrlList] = useState<string[]>([defaultImage])

  const isUploaded = useMemo(() => {
    return fileList?.length > 1 || fileList[0] !== defaultImage
  }, [fileList])

  const changeHandler = useCallback(
    (e: ChangeEvent) => {
      const fileList = (e.target as HTMLInputElement).files
      if (!fileList.length) return
      else {
        const preservedFileList = Array.from(fileList)
        const uploadedFileList = preservedFileList.filter((file) => file.size <= limitFileSize)

        if (uploadedFileList.length !== fileList.length) {
          const exceptedFileNameList = preservedFileList
            .filter((file) => !preservedFileList.includes(file))
            .map((file) => file.name)
          window.alert(
            `아래 이미지들은 허용 사이즈를 초과해 제외되었습니다.\n${exceptedFileNameList.join(
              `\n`
            )}`
          )
        }
        if (!uploadedFileList.length) return
        else onUpload(uploadedFileList)
      }
    },
    [onUpload]
  )

  const removeClickHandler = useCallback(() => {
    onUpload(null)
  }, [])

  useLayoutEffect(() => {
    if (!fileList.length) {
      setImageUrlList([defaultImage])
    } else {
      setImageUrlList(
        fileList.map((file) => {
          if (typeof file === 'string') return file
          else return URL.createObjectURL(file)
        })
      )
    }
  }, [fileList])

  useLayoutEffect(() => {
    if (!imageUrlList.length) return
    else {
      return () => {
        imageUrlList.forEach((imageUrl) => URL.revokeObjectURL(imageUrl))
      }
    }
  }, [imageUrlList])

  return (
    <div className="file-list-container">
      <label
        className={clsx('file-list-uploader', className)}
        htmlFor={id || 'file-list-uploader-input'}
        title="이미지 업로드"
      >
        <Image src={defaultImage} alt="" width={56} height={56} quality={100} priority />
        <input
          ref={inputRef}
          type="file"
          id={id || 'file-list-uploader-input'}
          onChange={changeHandler}
          accept="image/*"
          multiple
        />
      </label>
      {isUploaded &&
        fileList.map((file, idx) => (
          <article key={file?.name || file} className="file-list-item">
            <Image
              src={imageUrlList[idx] || defaultImage}
              alt=""
              width={56}
              height={56}
              quality={100}
              priority
            />
          </article>
        ))}
    </div>
  )
}
