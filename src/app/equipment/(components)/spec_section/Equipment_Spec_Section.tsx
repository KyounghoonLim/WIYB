import Equipment_SpecList from './Equipment_SpecList'

export default function Equipment_Spec_Section({ type }: { type: string }) {
  return (
    <section className="w-[880px] h-[190px] flex-row-center">
      <article className="w-full h-full flex flex-col justify-evenly">
        <h2 className="h-14 typograph-16 font-bold flex-row-start">상세 스펙</h2>
        <Equipment_SpecList type={type} />
      </article>
    </section>
  )
}
