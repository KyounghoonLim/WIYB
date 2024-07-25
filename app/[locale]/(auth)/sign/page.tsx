"use client";

import { GenderType } from "@/src/@types/gender.types";
import Button from "@/src/components/buttons/Button";
import Form from "@/src/components/form/Form";
import Input from "@/src/components/Input/Input";
import InputDate from "@/src/components/Input/InputDate";
import Radio from "@/src/components/radio/Radio";
import { GENDER } from "@/src/constants/gender.constant";
import { useMemo, useState } from "react";

export default function SignPage() {
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<GenderType>(GENDER.FEMALE);
  const [birthday, setBirthday] = useState<Date | string>();

  const genderOptions = useMemo(() => {
    return Object.values(GENDER).map((value) => ({
      label: value,
      value: value,
    }));
  }, []);

  return (
    <div className="CONTENT-CONTAINER flex-col-start">
      <Form onSubmit={() => null} className="my-4 gap-8">
        <label htmlFor="sign-nickname" className="label">
          닉네임
          <Input id="sign-nickname" placeholder="2-10자 까지 가능합니다." value={nickname} onChange={setNickname} />
        </label>
        <label htmlFor="sign-gender" className="label">
          성별
          <Radio id="sign-gender" options={genderOptions} value={gender} name="sign-gender" onChange={setGender} />
        </label>
        <label htmlFor="sign-birth" className="label">
          생년월일
          <InputDate id="sign-birth" value={birthday} onChange={setBirthday} />
        </label>
        <Button type="submit" text="회원가입 완료하기" className="button-primary mt-8" disabled={!nickname || !gender || !birthday} />
      </Form>
    </div>
  );
}
