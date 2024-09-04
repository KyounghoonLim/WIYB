'use client'

import { equipmentContext } from 'providers/equipment/EquipmentProvider'
import { useCallback, useContext, useMemo } from 'react'
import Island from 'components/island/Island'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import useMyTranslate from 'hooks/useMyTranslate'
import loftSpecKeys from 'constants/json/loftspec.detail.constant.json'
import useHorizontalScroll from 'hooks/useHorizontalScroll'

export default function Equipment_LoftSpecTable({ equipmentType }: { equipmentType: string }) {
  const { equipment } = useContext(equipmentContext)
  const { t } = useMyTranslate('equipment.detail')
  const { horizontalScrollRef } = useHorizontalScroll()

  const { keys, data } = useMemo(() => {
    return {
      keys: loftSpecKeys[equipmentType],
      data: equipment?.detail?.loftSpec || [],
    }
  }, [equipmentType, equipment])

  /**
   * 값은 전부 숫자로 들어오므로
   * 각도를 나타내는 키의 경우 (°)를 붙여서 랜더링
   */
  const dataWithUnit = useCallback((key: string, value: number) => {
    if (!value) return value
    else {
      switch (key) {
        case 'loftDegree':
          return value + '°'
        case 'lieAngle':
          return value + '°'
        case 'bounce':
          return value + '°'
        default:
          return value
      }
    }
  }, [])

  return (
    <>
      <div className="w-full flex-row-start mb-8">
        <Island className="pr-0 py-4 overflow-auto hide-scrollbar">
          <div ref={horizontalScrollRef} className="pr-4 overflow-auto hide-scrollbar">
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
                          {dataWithUnit(key, spec[key])}
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
          </div>
        </Island>
      </div>
    </>
  )
}
