"use client";

import Button from "@/src/components/button/Button";
import FileUploader from "@/src/components/fileUploader/fileUploader";
import Form from "@/src/components/form/Form";
import Input from "@/src/components/Input/Input";
import { editUserProfile } from "@/src/services/userApi";
import React, { useCallback, useMemo, useState } from "react";

export default function ProfileForm({ user }) {
  const [profileImage, setProfileImage] = useState<File>();
  const [nickname, setNickname] = useState<string>("");
  const [handy, setHandy] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const submitHandler = useCallback(async () => {
    const imageUrl = URL.createObjectURL(profileImage);
    await editUserProfile(imageUrl, Number(handy), Number(height), Number(weight));
    URL.revokeObjectURL(imageUrl);
  }, [profileImage, handy, height, weight]);

  const numTypePreprocessor = useCallback((value: string) => {
    return Number(value) <= 0 ? "" : value;
  }, []);

  return (
    <Form onSubmit={submitHandler} className="my-4 gap-8">
      <label htmlFor="sign-profileImage" className="label">
        프로필 사진
        <FileUploader id="sign-profileImage" file={profileImage} onUpload={setProfileImage} />
      </label>
      <label htmlFor="sign-nickname" className="label">
        닉네임
        <Input id="sign-nickname" placeholder="2-10자 까지 가능합니다." value={nickname} onChange={setNickname} />
      </label>
      <label htmlFor="sign-score" className="label">
        핸디
        <Input id="sign-score" type="number" placeholder="평균 몇 타 오버이신가요?" value={handy} onChange={setHandy} />
      </label>
      <label htmlFor="sign-height" className="label">
        신장
        <Input id="sign-height" type="number" placeholder="키가 어떻게 되세요?" value={height} onChange={setHeight} preprocessor={numTypePreprocessor} />
      </label>
      <label htmlFor="sign-weight" className="label">
        몸무게
        <Input
          id="sign-weight"
          type="number"
          placeholder="몸무게가 어떻게 되세요?"
          value={weight}
          onChange={setWeight}
          preprocessor={numTypePreprocessor}
          unit="kg"
        />
      </label>
      <Button type="submit" text="프로필 수정하기" className="button-primary mt-8" disabled={!nickname || !handy || !height || !weight} />
    </Form>
  );
}
