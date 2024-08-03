"use client";

import React, { useContext, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../stores/userStore";
import { requestTimeContext } from "../../providers/RequestKeyProvider";
import useSWR from "swr";
import { getUserProfile } from "../../services/userApi";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/constants/path.constant";

export default function useUser() {
  const { requestTime } = useContext(requestTimeContext);
  const [user, setUser] = useRecoilState(userState);

  const { replace } = useRouter();

  const userData = useSWR(
    !user && requestTime,
    async () => {
      return await getUserProfile();
    },
    {
      suspense: true,
      onError: () => replace(PATH.LOGIN),
    }
  )?.data;

  useLayoutEffect(() => {
    if (!userData) return;
    else setUser(userData);
  }, [userData]);

  return { user, setUser };
}
