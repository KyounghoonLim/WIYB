'use client'

import Select_Primary from 'components/select/Select_Primary'
import { COMMUNITY_CATRGORY, CommunityCategory } from 'constants/community.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import { useMemo } from 'react'

export default function CommunityForm_Category({
  category,
  onChange,
  disabled,
}: {
  category: CommunityCategory
  onChange: (val: CommunityCategory) => void
  disabled?: boolean
}) {
  const { t } = useMyTranslate('community.category')

  const communityCategoryOptions = useMemo(() => {
    return Object.values(COMMUNITY_CATRGORY)
      .filter((val) => val !== COMMUNITY_CATRGORY.ALL)
      .map((val) => ({
        label: t(val),
        value: val,
      }))
  }, [])

  return (
    <label htmlFor="" className="text-text-label-100 flex flex-col gap-3 typograph-16">
      카테고리
      <Select_Primary
        options={communityCategoryOptions}
        value={category}
        onChange={onChange}
        className="h-12"
        width={94}
        disabled={disabled}
      />
    </label>
  )
}
