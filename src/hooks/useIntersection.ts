"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

type cb = () => void | Promise<void>;

export default function useIntersection(
  onEnter: cb = () => console.log("enter"),
  onLeave: cb = () => console.log("leave"),
  delay = 0,
  options: IntersectionObserverInit = { threshold: [0, 1] }
) {
  const intersectionRef = useRef<any>(null);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [throttle, setThrottle] = useState<any>();

  const observer = useMemo<IntersectionObserver>(() => {
    return new IntersectionObserver(([entry]) => {
      if (throttle) return;
      else {
        switch (entry.isIntersecting) {
          case true: {
            if (isEntered) return;
            else {
              setThrottle(
                setTimeout(() => {
                  setThrottle(null);
                }, delay)
              );
              setIsEntered(true);
              onEnter();
            }
            break;
          }
          case false: {
            if (!isEntered) return;
            else {
              setThrottle(
                setTimeout(() => {
                  setThrottle(null);
                }, delay)
              );
              setIsEntered(false);
              onLeave();
            }
            break;
          }
        }
      }
    }, options);
  }, [onEnter, onLeave, isEntered, throttle]);

  useLayoutEffect(() => {
    if (!intersectionRef.current) return;
    else {
      observer.observe(intersectionRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [intersectionRef.current, observer]);

  return { intersectionRef, observer };
}
