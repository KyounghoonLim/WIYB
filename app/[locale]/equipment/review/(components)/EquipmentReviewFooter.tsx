import Button from "@/src/components/button/Button";
import Portal from "@/src/components/portal/Portal";
import React from "react";

export default function EquipmentReviewFooter({ id, open }: { id: string; open: () => any }) {
  return (
    <Portal target="footer">
      <Button text="리뷰/평가 등록하기" className="w-[343px] bottom-0" onClick={open} />
    </Portal>
  );
}
