import React from 'react'
import Thumbnail from '../../thumbnail/Thumbnail'
import clsx from 'clsx'

export default function EquipGridItem({
  item,
  idx,
}: {
  item: { label; image; brandImage; name }
  idx: number
}) {
  return (
    <div
      className={clsx(
        'w-full aspect-[0.766]',
        item.name ? 'grid-item-primary' : 'grid-item-secondary'
      )}
    >
      <h5 className="typograph-12">{item.label}</h5>
      {item.name ? (
        <>
          <Thumbnail src={item.image} />
          <div>
            <Thumbnail src={item.brandImage} width={20} />
            <p>{item.name}</p>
          </div>
        </>
      ) : (
        <p className="typograph-10 mx-auto my-auto">등록해주세요</p>
      )}
    </div>
  )
}
