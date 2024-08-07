import Portal from "@/src/components/portal/Portal";
import React from "react";
import BackIcon from "i/icon_back.svg";
import CloseIcon from "i/icon_close_bold.svg";
import { useRouter } from "next/navigation";

export default function EquipmentReviewNav({ isForm, close }: { isForm: boolean; close: () => any }) {
  const { back } = useRouter();

  return (
    <Portal target="nav">
      <div className="w-full flex justify-between items-center relative">
        {isForm ? (
          <>
            <CloseIcon className="absolute left-0" onClick={close} />
            <h1 className="mx-auto">리뷰/평가 등록하기</h1>
          </>
        ) : (
          <>
            <BackIcon className="absolute left-0" onClick={back} />
            <h1 className="mx-auto">리뷰</h1>
          </>
        )}
      </div>
    </Portal>
  );
}
