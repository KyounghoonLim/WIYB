import Button from "@/src/components/buttons/Button";
import Link from "next/link";

export default function LoginSection_2() {
  return (
    <section className="flex-col-start w-full h-full relative">
      <Button />
      <Button />
      <Button />
      <footer className="text-center typograph-11 text-@-text-subtitle py-6 absolute bottom-0">
        소셜 로그인을 진행 하시면
        <br />
        <Link className="underline" href={""}>
          이용약관
        </Link>
        과{" "}
        <Link className="underline" href={""}>
          개인정보 처리방침
        </Link>
        에 동의한 것으로 간주됩니다.
      </footer>
    </section>
  );
}
