'use client'

import GoogleLoginButton from '@/src/components/button/loginButtons/GoogleLoginButton'
import KakaoLoginButton from '@/src/components/button/loginButtons/KakaoLoginButton'
import NaverLoginButton from '@/src/components/button/loginButtons/NaverLoginButton'

export default function LoginSection_2() {
  return (
    <section className="flex-col-start w-full h-full relative px-2 py-6">
      <div className="w-full flex-col-center gap-3">
        <NaverLoginButton />
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </section>
  )
}
