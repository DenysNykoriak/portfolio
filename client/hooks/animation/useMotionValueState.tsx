import { MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export const useMotionValueState = <T,>(motionValue: MotionValue<T>) => {
  const [motionValueState, setMotionValueState] = useState(motionValue.get());

  useEffect(() => {
    const unSub = motionValue.on("change", setMotionValueState);

    return unSub;
  }, []);

  return motionValueState;
};
