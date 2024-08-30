import GoogleLoginButton from 'components/button/loginButtons/GoogleLoginButton'
import KakaoLoginButton from 'components/button/loginButtons/KakaoLoginButton'
import NaverLoginButton from 'components/button/loginButtons/NaverLoginButton'
import Logo_Main from 'components/logo/Logo_Main'

export default function LoginPage() {
  return (
    <main className="PAGE-CONTAINER">
      <section className="w-full h-[176px] flex-col-center bg-white no-auto-size">
        <Logo_Main />
      </section>
      <section className="flex-col-start w-full h-full relative px-2 py-6">
        <div className="w-[880px] flex-col-center gap-4">
          <NaverLoginButton />
          <KakaoLoginButton />
          <GoogleLoginButton />
        </div>
      </section>
    </main>
  )
}
