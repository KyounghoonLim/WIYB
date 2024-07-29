"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CarouselProps } from "@/src/@types/components/carousel/carousel.interface";
import clsx from "clsx";

export default function Carousel<T>({ name, items, renderFunction, onClick, className, itemKey = "item", swiperProps }: CarouselProps<T>) {
  return (
    <Swiper
      grabCursor
      mousewheel={{ thresholdDelta: 30, thresholdTime: 300 }}
      initialSlide={0}
      threshold={20}
      slidesPerView={"auto"}
      className={clsx("w-full !py-4", className)}
      spaceBetween={16}
      {...swiperProps}
      modules={[Mousewheel]}
    >
      {(items as T[]).map((item, idx) => (
        <SwiperSlide className="!w-auto" key={name + "-" + idx} id={name + "-" + idx} onClick={() => onClick(item)}>
          {renderFunction({ [itemKey]: item })}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
