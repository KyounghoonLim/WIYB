import MyLink from 'components/link/MyLink'
import { PATH } from 'constants/path.constant'

export default function Logo_Main() {
  return (
    <MyLink href={PATH.MAIN} className="flex-col-center">
      <h1 className="typograph-64 font-black">WIYB</h1>
      <p className="typograph-14 text-text-label-000">이 세상 모든 골퍼들의 커뮤니티</p>
    </MyLink>
  )
}
