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
      <section className="flex-col-start w-full h-full relative py-4">
        <div className="w-[550px] flex-col-center gap-4">
          <p className="text-text-label-000 text-center py-8">
            로그인 후 모든 서비스를 사용해보세요. 🔥
          </p>
          <NaverLoginButton />
          <KakaoLoginButton />
          <GoogleLoginButton />
        </div>
      </section>
    </main>
  )
}
