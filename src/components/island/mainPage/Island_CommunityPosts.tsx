'use client'

import useMyQuery from 'hooks/useMyQuery'
import Island from '../Island'
import Button_SeeMore from 'components/button/Button_SeeMore'
import List_Primary from 'components/list/List_Primary'
import { getRecentPostsApi } from 'services/communityApi'
import ListItem_Community from 'components/list/listItems/ListItem_Community'
import { PATH, PATH_PARAMS } from 'constants/path.constant'

export default function Island_CommunityPosts() {
  const {
    data: { content: posts },
  } = useMyQuery(['recentCommunityPosts'], getRecentPostsApi, {
    initialData: {
      metadata: null,
      content: Array(5).fill(undefined),
    },
  })

  return (
    <Island className="w-[434px] h-[424px] py-0">
      <section className="w-full h-16 flex justify-between items-center">
        <span>
          지금 인기있는 {}
          <h3 className="typograph-16 inline-block font-bold">커뮤니티 글</h3>
        </span>
        <Button_SeeMore
          href={PATH.COMMUNITY + PATH_PARAMS.COMMUNITY.replace('[communityCategory]', 'all')}
        />
      </section>
      <section>
        {Boolean(posts.length) ? (
          <List_Primary
            items={posts.slice(0, 4)}
            Component={({ item, index, isLast }) =>
              ListItem_Community({ item, index, isLast, listing: true })
            }
          />
        ) : (
          <div className="w-full h-[320px] flex-col-center text-text-label-100">
            게시글이 없습니다.
          </div>
        )}
      </section>
    </Island>
  )
}
