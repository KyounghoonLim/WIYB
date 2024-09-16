'use client'

import ImageUploader_Multiple from 'components/uploader/ImageUploader_Multiple'

export default function CommunityForm_ImageUploader({
  imageFiles,
  onChange,
}: {
  imageFiles: Array<File | string>
  onChange: (value: File[]) => void
}) {
  return (
    <label htmlFor="" className="w-full text-text-label-100 flex flex-col gap-3 typograph-16">
      이미지 파일
      <ImageUploader_Multiple
        id="community-form-image-uploader"
        fileList={imageFiles}
        onUpload={onChange}
      />
    </label>
  )
}
