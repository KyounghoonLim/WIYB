'use client'

import { isFileExist } from 'utils/fileUtils'
import clsx from 'clsx'
import Image from 'next/image'
import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ImageUploader_Multiple_Props } from 'types/components/uploader/uploader.interface'
import RemoveIcon from 'icons/icon_remove.svg'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'

export default function ImageUploader_Multiple({
  fileList,
  onUpload,
  id,
  className,
}: ImageUploader_Multiple_Props) {
  const { current: limitFileSize } = useRef<number>(5 * 1024 * 1024)
  const { current: limitFileLength } = useRef<number>(4)
  const inputRef = useRef<HTMLInputElement>()

  const [imageUrlList, setImageUrlList] = useState<string[]>([])

  const changeHandler = useCallback(
    (e: ChangeEvent) => {
      let _fileList = (e.target as HTMLInputElement).files
      if (!_fileList.length) return
      else {
        const preservedFileList = (() => {
          const fileArray = Array.from(_fileList)
          if (
            _fileList.length > limitFileLength ||
            fileList.length + _fileList.length > limitFileLength
          ) {
            window.alert('이미지는 최대 4개 까지 등록이 가능합니다.')
            return fileArray.slice(4)
          } else return fileArray
        })()

        console.log(_fileList, preservedFileList)

        const allowedFileList = preservedFileList.filter((file) => file.size <= limitFileSize)
        const uploadedFileList = [
          ...fileList,
          ...preservedFileList.filter((file) => !isFileExist(fileList as File[], file)),
        ]

        if (allowedFileList.length !== preservedFileList.length) {
          const exceptedFileNameList = preservedFileList
            .filter((file) => file.size >= limitFileSize)
            .map((file) => file.name)
          window.alert(
            `아래 이미지들은 허용 사이즈를 초과해 제외되었습니다.\n${exceptedFileNameList.join(
              `\n`
            )}`
          )
        }

        /// 다음 이벤트를 위해 비워둠 ///
        ;(e.target as HTMLInputElement).value = null

        if (!uploadedFileList.length) return
        else onUpload(uploadedFileList)
      }
    },
    [fileList, onUpload]
  )

  const removeClickHandler = useCallback(
    (e: SyntheticEvent, file: File | string) => {
      e.stopPropagation()
      const newFileList = fileList.filter((_file) => _file !== file)
      onUpload(newFileList)
    },
    [fileList]
  )

  useLayoutEffect(() => {
    if (!fileList.length) {
      setImageUrlList([])
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
    <div className="image-uplaoder-multiple-container">
      <label
        className={clsx('image-uploader-multiple', className)}
        htmlFor={id || 'image-uploader-multiple'}
        title="이미지 업로드"
      >
        <Thumbnail_Primary src={null} width={56} height={56} />
        <input
          ref={inputRef}
          type="file"
          id={id || 'image-uploader-multiple'}
          onChange={changeHandler}
          accept="image/*"
          multiple
        />
      </label>
      {fileList.map((file, idx) => (
        <article key={(file as File)?.name || (file as string)} className="image-uploader-item">
          <Thumbnail_Primary src={imageUrlList[idx]} width={56} height={56} />
          <div className="image-uploader-item-remove" onClick={(e) => removeClickHandler(e, file)}>
            <RemoveIcon className="fill-white" />
          </div>
        </article>
      ))}
    </div>
  )
}
