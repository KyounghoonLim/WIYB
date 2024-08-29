'use client'

import { RelatedVideo } from 'types/equipment.types'
import Island from '../Island'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import MyLink from 'components/link/MyLink'

export default function Island_Equipment_Video({ video }: { video: RelatedVideo }) {
  return (
    <Island className="w-[240px] h-[200px] p-0 flex-col-center rounded-t-xl overflow-hidden no-auto-size">
      <div title={video?.title}>
        <MyLink target="_blank" href={video.videoUrl} className="hover:dim">
          <div className="w-[240px] h-[135px] flex-row-center overflow-hidden">
            <Thumbnail_Primary
              src={video?.thumbnailUrl}
              width={240}
              height={180}
              className="aspect-[4/3]"
            />
          </div>
          <div className="w-[240px] h-[65px] p-4">
            <p className="typograph-14 !leading-5 truncate-line">{video.title}</p>
          </div>
        </MyLink>
      </div>
    </Island>
  )
}
