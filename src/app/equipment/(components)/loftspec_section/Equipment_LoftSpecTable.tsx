'use client'

import { equipmentContext } from 'providers/EquipmentProvider'
import { useContext, useMemo } from 'react'
import Island from 'components/island/Island'
import { dummy_loftSpec } from '@/@dummy'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import useMyTranslate from 'hooks/useMyTranslate'

export default function Equipment_LoftSpecTable({ type }: { type: string }) {
  const { equipment } = useContext(equipmentContext)
  const { t } = useMyTranslate('equipment.detail')

  const { keys, data } = useMemo(() => {
    const _type = Object.keys(dummy_loftSpec).includes(type) ? type : 'IRON'
    return dummy_loftSpec[_type] as {
      keys: string[]
      data: object[]
    }
  }, [type])

  return (
    <>
      <div className="w-full flex-row-start mb-8">
        <Island className="p-4 overflow-auto hide-scrollbar">
          {equipment ? (
            <table className="table-primary">
              <tbody>
                {keys.map((key, keyIndex) => (
                  <tr key={key} className="table-primary-row">
                    <td className="table-primary-head">{t(key)}</td>
                    {data.map((spec, specIndex) => (
                      <td
                        key={key + '-' + specIndex}
                        className="table-primary-cell"
                        data-index={keyIndex}
                      >
                        {spec[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full py-1 flex-row-center" style={{ height: 37 * keys?.length }}>
              <LoadingSpinner width={80} height={80} />
            </div>
          )}
        </Island>
      </div>
    </>
  )
}
