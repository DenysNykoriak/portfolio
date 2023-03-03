import React, { FC } from "react";
import PinModal from "../components/login/PinModal";
import { PrivateInfoContext, usePrivateInfo } from "../privateInfo";

export const withPrivateInfo = <WrappedProps extends object>(
  WrappedComponent: FC<WrappedProps>
) => {
  return function withPrivateInfoHOC(props: WrappedProps) {
    const { privateInfoCtxValue } = usePrivateInfo();

    return (
      <>
        <PrivateInfoContext.Provider value={privateInfoCtxValue}>
          <PinModal />
          <WrappedComponent {...props} />
        </PrivateInfoContext.Provider>
      </>
    );
  };
};
