import Button_Equipment_Bookmark from 'components/button/equipmentPage/Button_Equipment_Bookmark'
import Button_Equipment_Review from 'components/button/equipmentPage/Button_Equipment_Review'
import Button_Equipment_Share from 'components/button/equipmentPage/Button_Equipment_Share'
import Island_Equipment_Graph from 'components/island/equipmentPage/Island_Equipment_Graph'
import Island_Equipment_Simple from 'components/island/equipmentPage/Island_Equipment_Simple'

export default function Equipment_Info_Section() {
  return (
    <section className="w-[880px] h-[336px] flex-row-center gap-4">
      <article className="w-[596px] h-full flex flex-col justify-evenly">
        <h2 className="typograph-16 font-bold">기본 정보</h2>
        <div className="w-full flex-col-start gap-4">
          <Island_Equipment_Simple />
          <div className="w-full flex-row-start gap-4">
            <Button_Equipment_Review />
            <Button_Equipment_Bookmark />
            <Button_Equipment_Share />
          </div>
        </div>
      </article>
      <article className="w-[268px] h-full flex flex-col justify-evenly">
        <h2 className="typograph-16 font-bold">평가 지표</h2>
        <Island_Equipment_Graph />
      </article>
    </section>
  )
}
