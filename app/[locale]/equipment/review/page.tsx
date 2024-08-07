"use client";

import { PATH } from "@/src/constants/path.constant";
import { getEquipmentDetail } from "@/src/services/equipmentApi";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";
import useSWR from "swr";
import EquipmentReviewNav from "./(components)/EquipmentReviewNav";
import EquipmentReviewSection_1 from "./(components)/EquipmentReviewSection_1";
import EquipmentReviewSection_2 from "./(components)/EquipmentReviewSection_2";
import EquipmentReviewFooter from "./(components)/EquipmentReviewFooter";
import EquipmentReviewForm from "./(components)/form/EquipmentReviewForm";

export default function EquipmentReviewPage({ searchParams: { id, form } }: { searchParams: { id: string; form: string } }) {
  const [flag, setFlag] = useState<boolean>(Boolean(form));
  const { data: equip, error } = useSWR(id, getEquipmentDetail);
  const { replace } = useRouter();

  useLayoutEffect(() => {
    if (!error) return;
    else replace(PATH.LOGIN);
  }, [error]);

  return (
    <main className="SCROLLABLE-CONTAINER px-0">
      <EquipmentReviewNav isForm={flag} close={() => setFlag(false)} />
      <EquipmentReviewSection_1 equip={equip} />
      {flag ? (
        <>
          <EquipmentReviewForm />
        </>
      ) : (
        <>
          <hr className="border-@-neutral-100" />
          <EquipmentReviewSection_2 {...{ ...equip }} />
          <EquipmentReviewFooter id={id} open={() => setFlag(true)} />
        </>
      )}
    </main>
  );
}
