'use client'

import { Fragment, ReactNode, useMemo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

type ListWrapperChildren = ({
  width,
  height,
}: {
  width: number | undefined
  height: number | undefined
}) => ReactNode

export default function List_Wrapper({
  children,
  autoSize,
}: {
  children: ListWrapperChildren
  autoSize?: boolean
}) {
  const Children = useMemo(() => {
    return !autoSize && children({ width: undefined, height: undefined })
  }, [autoSize, children])

  return <>{autoSize ? <AutoSizer>{children}</AutoSizer> : <Fragment>{Children}</Fragment>}</>
}
