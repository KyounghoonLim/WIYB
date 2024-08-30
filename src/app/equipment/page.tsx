import EquipmentProvider from 'providers/equipment/EquipmentProvider'
import Equipment_Info_Section from './(components)/info_section/Equipment_Info_Section'
import Equipment_LoftSpec_Section from './(components)/loftspec_section/Equipment_LoftSpec_Section'
import Equipment_Spec_Section from './(components)/spec_section/Equipment_Spec_Section'
import Equipment_Video_Section from './(components)/video_section/Equipment_Video_Section'
import ReviewProvider from 'providers/review/ReviewProvider'
import Equipment_Review_Section from './(components)/review_section/Equipment_Review_Section'

export default function ProductPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: string }
}) {
  return (
    <EquipmentProvider id={id} type={type}>
      <ReviewProvider id={id}>
        <main className="PAGE-CONTAINER pt-16 pb-4">
          {/* 기본 정보, 평가 지표 */}
          <Equipment_Info_Section />
          {/* 상세 스펙 */}
          <Equipment_Spec_Section type={type} />
          {/* 상세 로프트 스펙 */}
          <Equipment_LoftSpec_Section type={type} />
          {/* 관련 영상 */}
          <Equipment_Video_Section />
          {/* 리뷰 */}
          <Equipment_Review_Section />
        </main>
      </ReviewProvider>
    </EquipmentProvider>
  )
}
