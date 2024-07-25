import UserThumbnail from "@/src/components/thumbnail/UserThumbnail";
import React from "react";

/// 유저 프로필 섹션 ///
export default function MainSection_1() {
  return (
    <section className="w-full h-[133px] flex-col items-center gap-3 py-4">
      <div className="flex items-center gap-3">
        <UserThumbnail src="/images/1200x1200.png" width={54} />
        <div className="flex-col items-center typograph-24">
          안녕하세요 👋
          <h3 className="font-bold">제나토리</h3>
        </div>
      </div>
      <div className="h-[25px] flex items-center gap-2 typograph-14 text-@-text-label">
        <span>Handicap +4</span>
        <span>180cm/70kg</span>
      </div>
    </section>
  );
}
