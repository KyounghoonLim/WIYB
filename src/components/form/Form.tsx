import { FormProps } from '@/@types/components/form/form.interface'
import useThrottle from '@/hooks/useThrottle'
import clsx from 'clsx'
import React, { SyntheticEvent, useCallback } from 'react'

export default function Form({ children, onSubmit, className }: FormProps) {
  const { throttling } = useThrottle(true)

  const submitHander = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()
      throttling(onSubmit)
    },
    [onSubmit, throttling]
  )

  return (
    <form className={clsx('form', className)} onSubmit={submitHander}>
      {children}
    </form>
  )
}
