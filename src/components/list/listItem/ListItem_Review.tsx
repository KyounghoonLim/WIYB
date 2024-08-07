import React, { useMemo } from "react";
import { Review } from "s/@types/review.types";
import Thumbnail from "../../thumbnail/Thumbnail";
import Bedge from "../../bedge/Bedge";
import { ListItemProps } from "@/src/@types/components/list/list.interface";

export default function ListItem_Review({ item: review, idx }: ListItemProps<Review>) {
  const user = useMemo(() => {
    return review?.user;
  }, [review]);

  return (
    <div className="list-item flex-col items-start gap-5">
      <div className="w-full flex-row-start gap-[6px]">
        <Thumbnail src={user?.imageUrl || "/images/image_dummy_profile.png"} width={40} className="rounded-[50%]" />
        <div className="flex flex-col gap-1">
          <h3 className="typograph-14 font-semibold">{user.nickname || "제나토리"}</h3>
          <div className="flex gap-1">
            <Bedge text={user?.handy ? `${user.handy}${user.handy > 0 ? "+" : ""}` : "핸디 정보가 없습니다."} className="bedge-sm" />
            <Bedge
              text={user?.height || user?.weight ? `${user?.height || "???"}cm/${user?.weight || "???"}kg` : "체형 정보가 없습니다."}
              className="bedge-sm"
            />
          </div>
        </div>
      </div>
      <p className="typograph-14">{review?.content}</p>
      <div className="flex-row-start gap-2">
        {review?.imageUrls.map((imageUrl) => (
          <Thumbnail key={imageUrl} src={imageUrl} width={56} className="rounded-[20px]" />
        ))}
      </div>
    </div>
  );
}
