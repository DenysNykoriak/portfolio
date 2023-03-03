import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMotionValueState } from "./useMotionValueState";

type WithDOMRectType = {
  current?: {
    getBoundingClientRect: () => DOMRect;
  } | null;
};

type DirectionType = "Horizontal" | "Vertical";

type UseTrackTranslateOptionsType<T> = {
  movableRef: React.RefObject<T> & WithDOMRectType;
  direction: DirectionType;
  dimensions: {
    width: number;
    height: number;
  };
};

export const useScrollTrackTranslate = <T,>({
  movableRef,
  direction,
  dimensions,
}: UseTrackTranslateOptionsType<T>) => {
  const [translate, setTranslate] = useState(0);

  const { scrollY } = useScroll();
  const scrollState = useMotionValueState(scrollY);

  useEffect(() => {
    if (movableRef.current) {
      const rect = movableRef.current.getBoundingClientRect();

      const trackLength =
        direction === "Horizontal"
          ? dimensions.width - rect.width - 20
          : dimensions.height - rect.height;

      const rawNowScrollPosition = dimensions.height - rect.bottom;

      //If raw < 0 = 0, if raw > height = height, else nowPosition = rawNowPosition
      const nowScrollPosition =
        rawNowScrollPosition < 0
          ? 0
          : rawNowScrollPosition > dimensions.height
          ? dimensions.height
          : rawNowScrollPosition;

      //Convert to Translate
      setTranslate(
        (((nowScrollPosition * 100) / dimensions.height) * trackLength) / 100
      );
    }
  }, [scrollState]);

  return translate;
};
