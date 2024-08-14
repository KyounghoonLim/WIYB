"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * @argument allowToMove 해당 컨테이너 엘리먼트를 슬라이드와 동시에 움직일 것인지
 * @argument maxOffset 컨테이너 엘리먼트가 이동할 때 얼마만큼 이동할 수 있는지 (절대값)
 */
interface ContainerMoveContext {
  allowToMove?: boolean;
  maxOffsetTop?: number;
  maxOffsetBottom?: number;
}

interface HookCallbacks {
  onExpand?: () => any;
  onCompress?: () => any;
  onTouchStart?: () => any;
  onTouchMove?: () => any;
  onTouchEnd?: () => any;
}

const defaultCallbacks: HookCallbacks = {
  onExpand: undefined,
  onCompress: undefined,
  onTouchStart: undefined,
  onTouchMove: undefined,
  onTouchEnd: undefined,
};

const defaultMoveContext: ContainerMoveContext = {
  allowToMove: true,
  maxOffsetTop: 20,
  maxOffsetBottom: 20,
};

/**
 * 상하로 타겟 엘리먼트를 슬라이드 하기 위한 커스텀 훅
 * @param minOffset touchEnd effect 가 실행되기에 최소 오프셋
 * @param callbacks 터치에 대한 콜백함수 인터페이스
 * @param moveContext touch slide 시 컨테이너의 움직임
 * @returns
 */
export default function useVerticalSlide(
  minOffset: number = 30,
  callbacks: HookCallbacks = defaultCallbacks,
  moveContext: ContainerMoveContext = defaultMoveContext,
  touchActionCondition = true
) {
  const containerRef = useRef<HTMLElement>(); /// container element
  const touchHandleRef = useRef<HTMLElement>(null); /// allow to touch element
  const lastTouchedPositionRef = useRef<number>(0); /// last touched position

  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [touchVector, setTouchVector] = useState<number>(0); /// -1: top, 0: zero, 1: bottom

  const moveHandler = useCallback(
    (y) => {
      if (!isTouched || !touchActionCondition) return;
      else {
        callbacks?.onTouchMove && callbacks?.onTouchMove();

        const target = Math.sign(y - lastTouchedPositionRef.current);
        lastTouchedPositionRef.current = y;
        setTouchVector(target);

        if (containerRef.current) {
          lastTouchedPositionRef["clientTop"] =
            containerRef.current.getBoundingClientRect().top;
          if (
            containerRef["offset"] === null ||
            containerRef["offset"] === undefined
          ) {
            containerRef["offset"] = 0;
          } else {
            const offset = containerRef["offset"] - target * 1.5;
            if (
              offset > moveContext.maxOffsetTop! ||
              offset < moveContext.maxOffsetBottom! * -1
            )
              return;
            else {
              containerRef["offset"] = offset;
              if (!moveContext.allowToMove) return;
              else {
                containerRef.current.style.bottom = `${containerRef["offset"]}px`;
              }
            }
          }
        }
      }
    },
    [
      isTouched,
      containerRef.current,
      lastTouchedPositionRef.current,
      moveContext,
      touchActionCondition,
    ]
  );

  const endHandler = useCallback(() => {
    setIsTouched(false);
    if (moveContext.allowToMove && containerRef.current) {
      setTimeout(() => {
        containerRef["offset"] = 0;
        containerRef.current!.style.bottom = "0";
      }, 0);

      callbacks?.onTouchEnd && callbacks?.onTouchEnd();
    }
  }, [containerRef.current, moveContext]);

  /// add event listeners (start, end) ///
  useLayoutEffect(() => {
    if (!touchHandleRef.current) return;
    else {
      const condition = touchHandleRef.current.ontouchstart !== undefined;
      switch (condition) {
        case true: {
          touchHandleRef.current.ontouchstart = () => setIsTouched(true);
          touchHandleRef.current.ontouchend = endHandler;
          touchHandleRef.current.ontouchcancel = endHandler;
          break;
        }
        case false: {
          touchHandleRef.current.onmousedown = () => setIsTouched(true);
          window.addEventListener("mouseup", endHandler);

          return () => {
            window.removeEventListener("mouseup", endHandler);
          };
        }
      }
    }
  }, [touchHandleRef.current, moveHandler, endHandler]);

  /// add event listener (move) ///
  useLayoutEffect(() => {
    if (!isTouched) return;
    else {
      const condition = touchHandleRef.current?.ontouchstart !== undefined;
      if (condition) {
        const touchMoveHandler = (e: TouchEvent) =>
          moveHandler(e.touches[0].clientY);
        touchHandleRef.current.ontouchmove = touchMoveHandler;
        return () => (touchHandleRef.current!.ontouchmove = null);
      } else {
        const mouseMoveHandler = (e: MouseEvent) => moveHandler(e.clientY);
        window.addEventListener("mousemove", mouseMoveHandler);
        return () => window.removeEventListener("mousemove", mouseMoveHandler);
      }
    }
  }, [isTouched]);

  /// fire when ended touches ///
  useLayoutEffect(() => {
    if (
      isTouched ||
      (Math.abs(containerRef["offset"]) < minOffset &&
        Math.abs(
          lastTouchedPositionRef.current - lastTouchedPositionRef["clientTop"]
        ) < minOffset) ||
      !touchActionCondition
    )
      return;
    else if (
      !lastTouchedPositionRef.current ||
      !lastTouchedPositionRef["clientTop"]
    )
      return;
    else {
      const { onExpand, onCompress } = callbacks;

      switch (touchVector) {
        case -1:
          onExpand && onExpand();
          break;
        case 1:
          onCompress && onCompress();
          break;
        case 0: {
          if (
            !lastTouchedPositionRef.current ||
            !lastTouchedPositionRef["clientTop"]
          )
            return;
          else {
            const target =
              lastTouchedPositionRef.current -
              lastTouchedPositionRef["clientTop"];
            target < 0 ? onExpand && onExpand() : onCompress && onCompress();
          }
        }
      }
    }
    lastTouchedPositionRef.current = 0;
    lastTouchedPositionRef["clientTop"] = null;
    setTouchVector(0);
  }, [minOffset, isTouched, touchVector, callbacks, touchActionCondition]);

  return { containerRef, touchHandleRef, lastTouchedPositionRef };
}
