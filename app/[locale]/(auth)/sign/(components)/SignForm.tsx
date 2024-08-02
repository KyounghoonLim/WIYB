import { GenderType } from "@/src/@types/gender.types";
import Button from "@/src/components/button/Button";
import Form from "@/src/components/form/Form";
import Input from "@/src/components/Input/Input";
import InputDate from "@/src/components/Input/InputDate";
import InputDate_System from "@/src/components/Input/InputDate_System";
import Radio from "@/src/components/radio/Radio";
import { GENDER } from "@/src/constants/gender.constant";
import { setUserProfileApi } from "@/src/services/userApi";
import React, { useCallback, useMemo, useState } from "react";

export default function SignForm() {
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<GenderType>(GENDER.FEMALE);
  const [birth, setBirth] = useState<Date | string>();

  const genderOptions = useMemo(() => {
    return Object.values(GENDER).map((value) => ({
      label: value,
      value: value,
    }));
  }, []);

  const submitHandler = useCallback(() => {
    return setUserProfileApi(nickname, gender, birth);
  }, [nickname, gender, birth]);

  return (
    <Form onSubmit={submitHandler} className="my-4 gap-8">
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
        {/* <InputDate id="sign-birth" value={birth} onChange={setBirth} /> */}
        <InputDate_System id="sign-birth" value={birth} onChange={setBirth} />
      </label>
      <Button type="submit" text="회원가입 완료하기" className="button-primary mt-8" disabled={!nickname || !gender || !birth} />
    </Form>
  );
}
