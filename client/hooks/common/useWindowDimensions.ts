import { useEffect, useState } from "react";

function getWindowDimensions() {
  if (typeof window === "undefined")
    return {
      width: 0,
      height: 0,
    };

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const resizeAndScrollHandler = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", resizeAndScrollHandler);

    return () => {
      window.removeEventListener("resize", resizeAndScrollHandler);
    };
  }, []);

  return windowDimensions;
};
