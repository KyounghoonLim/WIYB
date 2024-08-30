import Equipment_LoftSpecTable from './Equipment_LoftSpecTable'
import loftSpecKeys from 'constants/json/loftspec.detail.constant.json'

export default function Equipment_LoftSpec_Section({ type }: { type: string }) {
  return (
    <>
      {loftSpecKeys[type] && (
        <section className="w-[880px] h-auto flex-row-center">
          <article className="w-full h-full flex flex-col justify-evenly gap-3">
            <span className="h-14 typograph-16 flex-row-start">
              상세&nbsp;
              <h2 className="font-bold inline-block">로프트 스펙</h2>
            </span>
            <Equipment_LoftSpecTable type={type} />
          </article>
        </section>
      )}
    </>
  )
}
