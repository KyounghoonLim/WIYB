'use client'

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Button_Primary from 'components/button/Button_Primary'
import Form from 'components/form/Form'
import Island from 'components/island/Island'
import { COMMUNITY_CATRGORY, CommunityCategory } from 'constants/community.constant'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'
import { getStorageItem, removeStorageItem } from 'utils/storageUtils'
import usePreventBack from 'hooks/usePreventBack'
import { CommunityPost } from 'types/community.types'
import CommunityForm_Title from '@/app/community/form/(components)/CommunityForm_Title'
import CommunityForm_Category from '@/app/community/form/(components)/CommunityForm_Category'
import CommunityForm_Content from '@/app/community/form/(components)/CommunityForm_Content'
import CommunityForm_ImageUploader from '@/app/community/form/(components)/CommunityForm_ImageUploader'
import { uploadImageApi } from 'services/commonApi'
import { postCommunityPostApi, updateCommunityPostApi } from 'services/communityApi'
import { PATH, PATH_PARAMS } from 'constants/path.constant'

export default function Form_Community({ post }: { post?: CommunityPost }) {
  const { current: postSnapshot } = useRef<CommunityPost>(post)

  const [category, setCategory] = useState<CommunityCategory>(COMMUNITY_CATRGORY.GENERAL)
  const [title, setTitle] = useState<string>(post?.title || '')
  const [content, setContent] = useState<string>(post?.content || '')
  const [imageFiles, setImageFiles] = useState<Array<File | string>>(post?.imageUrls || [])

  /**
   * 포스트 작성중일 때 뒤로가기로 나가는 것 방지
   */
  usePreventBack()

  const isValid = useMemo(() => {
    return Boolean(category && title && content)
  }, [category, title, content])

  const isChanged = useCallback((_title: string, _content: string, _imageUrls: string[]) => {
    if (!postSnapshot) return
    else {
      const { title, content, imageUrls } = postSnapshot
      const isSameImages =
        imageUrls.length === _imageUrls.length && imageUrls.every((url) => _imageUrls.includes(url))
      return title !== _title || content !== _content || !isSameImages
    }
  }, [])

  const submitHandler = useCallback(async () => {
    if (!isValid) {
      window.alert('카테고리, 제목, 내용은 필수 항목입니다.')
    } else {
      try {
        let imageUrlList = []

        if (imageFiles.length) {
          let isFileExist
          const formData = new FormData()
          imageFiles.forEach((file) => {
            if (typeof file === 'string') imageUrlList.push(file)
            else {
              formData.append('images', file)
              isFileExist = true
            }
          })

          if (isFileExist) {
            const uploadResult = (await uploadImageApi(formData)).filter((url) => url)
            if (uploadResult.length) {
              uploadResult.forEach((url) => {
                if (imageUrlList.includes(url)) return
                else imageUrlList.push(url)
              })
            }
          }
        }

        let postId

        /// 수정 ///
        if (post) {
          if (isChanged(title, content, imageUrlList)) {
            await updateCommunityPostApi(post.id, category, title, content, imageUrlList)
          }
          postId = post.id
        }
        /// 신규 작성 ///
        else {
          const post = await postCommunityPostApi(category, title, content, imageUrlList)
          postId = post.id
        }
        post ? window.alert('게시글이 수정되었습니다.') : window.alert('게시글이 작성되었습니다.')
        /// 작성글로 이동 ///
        const postUrl =
          PATH.COMMUNITY +
          PATH_PARAMS.COMMUNITY.replace('[communityCategory]', category) +
          PATH_PARAMS.COMMUNITY_POST.replace('[postId]', postId)

        location.href = postUrl
      } catch (err) {
        console.error(err)
        post
          ? window.alert('게시글이 수정에 실패했습니다.')
          : window.alert('게시글 작성에 실패했습니다.')
      }
    }
  }, [category, title, content, imageFiles, post])

  /**
   * 직전 페이지에서 카테고리 싱크
   */
  useLayoutEffect(() => {
    const latestCategory = getStorageItem(
      STORAGE_TYPE.SESSION,
      STORAGE_KEY.COMMUNITY.LATEST_CATEGORY
    ) as CommunityCategory
    if (!latestCategory) return
    else {
      setCategory(latestCategory)
      removeStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.COMMUNITY.LATEST_CATEGORY)
    }
  }, [])

  return (
    <Form onSubmit={submitHandler} className="w-[800px] py-8 gap-8">
      <Island className="p-6 flex flex-col gap-6">
        <section className="w-full flex-row-start gap-4">
          <CommunityForm_Title title={title} onChange={setTitle} />
          <CommunityForm_Category
            category={category}
            onChange={setCategory}
            disabled={Boolean(post)}
          />
        </section>
        <section>
          <CommunityForm_Content content={content} onChange={setContent} />
        </section>
        <section>
          <CommunityForm_ImageUploader imageFiles={imageFiles} onChange={setImageFiles} />
        </section>
      </Island>
      <div className="w-full flex-row-center gap-4">
        <Button_Primary
          type="submit"
          text={post ? '게시글 수정하기' : '게시글 작성하기'}
          disabled={!isValid}
        />
        <Button_Primary
          text={post ? '수정 취소하기' : '작성 취소하기'}
          className="bg-white hover:bg-neutral-100 text-black border-01 border-[#F0F0F0]"
          onClick={() => history.back()}
        />
      </div>
    </Form>
  )
}
