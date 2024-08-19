'use client'

import { Fragment, ReactNode, useMemo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

type ListWrapperChildren = ({ width, height }) => ReactNode

export default function ListWrapper({
  children,
  autoSize,
}: {
  children: ListWrapperChildren
  autoSize?: boolean
}) {
  const Children = useMemo(() => {
    return !autoSize && children({ width: null, height: null })
  }, [autoSize, children])

  return <>{autoSize ? <AutoSizer>{children}</AutoSizer> : <Fragment>{Children}</Fragment>}</>
}
