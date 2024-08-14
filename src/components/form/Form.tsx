import useThrottle from '@/src/hooks/useThrottle'
import clsx from 'clsx'
import React, { SyntheticEvent, useCallback, useRef } from 'react'

interface FormProps {
  children: React.ReactNode
  onSubmit: () => any | Promise<any>
  className?: string
}

export default function Form({ children, onSubmit, className }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { throttling } = useThrottle(true)

  const submitHander = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()
      throttling(onSubmit)
    },
    [onSubmit]
  )

  return (
    <form ref={formRef} className={clsx('form', className)} onSubmit={submitHander}>
      {children}
    </form>
  )
}
