'use client'

import { popularContext } from 'providers/equipment/PopularProvider'
import { useContext } from 'react'
import popularKeys from 'constants/json/popular.keys.constant.json'
import List_PopularEquipment from 'components/list/popularPage/List_PopularEquipment'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import useMyTranslate from 'hooks/useMyTranslate'
import clsx from 'clsx'

export default function Popular_Equipment_Section() {
  const { category, popularEquipments, isLoading } = useContext(popularContext)
  const { t } = useMyTranslate('equipment')

  return (
    <section className="w-[800px] flex-row-center flex-wrap gap-x-3 gap-y-12 py-6">
      {!isLoading ? (
        <>
          {/* 장비 타입별 랜더링 되는 키(관용성, 비거리 ...)가 존재하는지 판별
            없으면 해당 장비 타입의 전체 순위만 보여줌
          */}
          {!popularKeys[category] ? (
            /// 장비 타입의 인기순 분류가 없는 경우 (전체, 샤프트, 그립, 공) ///
            popularEquipments?.['all']?.length ? (
              /// 조회된 결과가 있는 경우 ///
              <>
                <div className="w-full flex-col-start">
                  <span className="w-full h-14 flex-row-start typograph-16">
                    {!category ? '전체 장비' : t('type.' + category)}&nbsp;
                    <h3 className="font-bold">{`Top ${popularEquipments['all']?.length}`}</h3>
                  </span>
                  <List_PopularEquipment equipments={popularEquipments['all']} />
                </div>
              </>
            ) : (
              /// 조회된 결과가 없는 경우 ///
              <div className="w-full h-[500px] flex-col-center typograph-16 text-text-label-000">
                데이터가 없습니다.
              </div>
            )
          ) : (
            /// 장비 타입의 인기순 분류가 있는 경우 (드라이버, 우드, 하이브리드, 아이언, 웨지, 퍼터) ///
            <>
              {Object.keys(popularEquipments).map((key, idx) => (
                <div key={key} className={clsx('w-full flex-col-start', idx && '!w-[394px]')}>
                  {/* 각 분류의 라벨링 */}
                  <span className="w-full h-14 flex-row-start typograph-16">
                    {t('type.' + category)}&nbsp;
                    <h3 className="font-bold">
                      {Boolean(idx) && t('evaluation.key.' + key)} Top{' '}
                      {popularEquipments[key].length}
                    </h3>
                  </span>
                  <>
                    {/* 각 분류의 데이터 */}
                    {popularEquipments?.[key]?.length ? (
                      /// 데이터가 있는 경우 ///
                      <List_PopularEquipment equipments={popularEquipments[key]} />
                    ) : (
                      /// 데이터가 없는 경우 ///
                      <div className="w-full h-[400px] flex-col-center typograph-16 text-text-label-000">
                        데이터가 없습니다.
                      </div>
                    )}
                  </>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <div className="w-full h-[500px] flex-col-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  )
}
