import MyLink from '@/src/components/link/MyLink'
import Portal from '@/src/components/portal/Portal'
import React from 'react'

export default function LoginFooter() {
  return (
    <Portal target="footer">
      <div className="w-full text-center typograph-11 text-@-text-subtitle">
        소셜 로그인을 진행 하시면
        <br />
        <MyLink className="underline" href={''}>
          이용약관
        </MyLink>
        과{' '}
        <MyLink className="underline" href={''}>
          개인정보 처리방침
        </MyLink>
        에 동의한 것으로 간주됩니다.
      </div>
    </Portal>
  )
}
