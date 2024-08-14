import Portal from '@/src/components/portal/Portal'
import React from 'react'
import CloseIcon from 'i/icon_close_bold.svg'
import { PATH } from '@/src/constants/path.constant'
import MyLink from '@/src/components/link/MyLink'

export default function SignNav() {
  return (
    <Portal target="nav">
      <MyLink href={PATH.LOGIN}>
        <CloseIcon />
      </MyLink>
    </Portal>
  )
}
