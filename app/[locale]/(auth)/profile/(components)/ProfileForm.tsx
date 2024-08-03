"use client";

import Button from "@/src/components/button/Button";
import FileUploader from "@/src/components/fileUploader/FileUploader";
import Form from "@/src/components/form/Form";
import Input from "@/src/components/Input/Input";
import { PATH } from "@/src/constants/path.constant";
import useUser from "@/src/hooks/user/useUser";
import { editUserProfile } from "@/src/services/userApi";
import { useRouter } from "next/navigation";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";

export default function ProfileForm() {
  const { user, setUser } = useUser();

  const [profileImage, setProfileImage] = useState<File | string>(user?.imageUrl);
  const [nickname, setNickname] = useState<string>(user?.nickname || "");
  const [handy, setHandy] = useState<string>(String(user?.handy) || "");
  const [height, setHeight] = useState<string>(String(user?.height) || "");
  const [weight, setWeight] = useState<string>(String(user?.weight) || "");

  const { replace } = useRouter();

  const submitHandler = useCallback(async () => {
    console.log("submit");
    // try {
    //   const imageUrl = typeof profileImage === "string" ? profileImage : URL.createObjectURL(profileImage);
    //   const newUser = await editUserProfile(imageUrl, nickname, Number(handy), Number(height), Number(weight));
    //   setUser(newUser);
    //   URL.revokeObjectURL(imageUrl);
    //   replace(PATH.MAIN);
    // } catch {
    //   /// pass ///
    // }
  }, [profileImage, nickname, handy, height, weight]);

  const numTypePreprocessor = useCallback((value: string) => {
    return Number(value) <= 0 ? "" : value;
  }, []);

  useLayoutEffect(() => {
    if (!user) return;
    else {
      setProfileImage(user.imageUrl);
      setNickname(user.nickname);
      setHandy(String(user.handy));
      setHeight(String(user.height));
      setWeight(String(user.weight));
    }
  }, [user]);

  return (
    <Form onSubmit={submitHandler} className="my-4 gap-8">
      <label htmlFor="" className="label">
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
