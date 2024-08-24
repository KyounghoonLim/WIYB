'use client'

import LoadingSpinner from 'components/loading/LoadingSpinner'
import Island from '../Island'

export default function Island_Equipment_DetailInfo({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Island className="w-auto min-w-[140px] h-[102px] p-4 flex flex-col justify-between typograph-16">
      {label ? (
        <>
          <h3>{label}</h3>
          <span className="font-bold text-end ml-8 no-auto-size">{value || '-'}</span>
        </>
      ) : (
        <>
          <LoadingSpinner width={50} height={50} />
        </>
      )}
    </Island>
  )
}
