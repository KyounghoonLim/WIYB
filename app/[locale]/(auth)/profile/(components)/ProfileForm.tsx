"use client";

import Button from "@/src/components/button/Button";
import Form from "@/src/components/form/Form";
import Input from "@/src/components/Input/Input";
import React, { useCallback, useMemo, useState } from "react";

export default function ProfileForm({ user }) {
  const [profileImage, setProfileImage] = useState<File>();
  const [nickname, setNickname] = useState<string>("");
  const [score, setScore] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();

  const submitHandler = useCallback(() => {}, []);

  return (
    <Form onSubmit={submitHandler} className="my-4 gap-8">
      <label htmlFor="sign-nickname" className="label">
        프로필 사진
        <Input id="sign-nickname" placeholder="2-10자 까지 가능합니다." value={nickname} onChange={setNickname} />
      </label>
      <label htmlFor="sign-nickname" className="label">
        닉네임
        <Input id="sign-nickname" placeholder="2-10자 까지 가능합니다." value={nickname} onChange={setNickname} />
      </label>
      <label htmlFor="sign-score" className="label">
        핸디
        <Input id="sign-score" type="number" placeholder="평균 몇 타 오버이신가요?" value={score} onChange={setScore} />
      </label>
      <label htmlFor="sign-height" className="label">
        신장
        <Input id="sign-height" type="number" placeholder="키가 어떻게 되세요?" value={height} onChange={setHeight} />
      </label>
      <label htmlFor="sign-weight" className="label">
        몸무게
        <Input id="sign-weight" type="number" placeholder="몸무게가 어떻게 되세요?" value={weight} onChange={setWeight} />
      </label>
      <Button type="submit" text="프로필 수정하기" className="button-primary mt-8" disabled={!nickname || !score || !height || !weight} />
    </Form>
  );
}
