'use client'

import Button_Equipment_GoToReview from 'components/button/equipmentPage/Button_Equipment_GoToReview'
import Island_Equipment_Graph from 'components/island/equipmentPage/Island_Equipment_Graph'
import Island_Equipment_Simple from 'components/island/equipmentPage/Island_Equipment_Simple'
import EquipmentProvider from 'providers/EquipmentProvider'

export default function ProductPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: string }
}) {
  return (
    <EquipmentProvider id={id} type={type}>
      <main className="PAGE-CONTAINER pt-16">
        <section className="flex-row-center gap-4">
          <article className="w-[596px] flex-col-start gap-4">
            <Island_Equipment_Simple />
            <Button_Equipment_GoToReview />
          </article>
          <Island_Equipment_Graph />
        </section>
      </main>
    </EquipmentProvider>
  )
}
