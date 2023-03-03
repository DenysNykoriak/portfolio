import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LocalStorageUtility } from "./utility/LocalStorageUtility";
import axios, { AxiosError } from "axios";
import { PrivateInfoResponseType } from "../pages/api/private_info";
import { useQueryVariable } from "./hooks/common/useQueryVariable";

const pinLocalStorage = new LocalStorageUtility<string>("pin", "");

export type PrivateInfoType = {
  phone_number: {
    raw: string;
    decorated: string;
  };
  resume_path: string;
} | null;

type PrivateInfoContextValueType = {
  privateInfo: PrivateInfoType;
  getPrivateInfo: (pin: string) => Promise<PrivateInfoResponseType>;
  modal: {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
  };
} | null;

export const PrivateInfoContext =
  React.createContext<PrivateInfoContextValueType>(null);

export const usePrivateInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [privateInfo, setPrivateInfo] = useState<PrivateInfoType | null>(null);

  //* Request To Server
  const getPrivateInfo = useCallback(async (pin: string) => {
    const response = await axios
      .get<PrivateInfoResponseType>("/api/private_info", {
        baseURL: process.env.API_URL,
        params: {
          pin,
        },
      })
      .catch((axiosError: AxiosError<PrivateInfoResponseType>) => {
        return axiosError.response;
      });

    //Success
    if (response?.data?.success) {
      pinLocalStorage.setValue(pin);

      const responsePrivateInfo = response.data.info;

      setPrivateInfo({
        phone_number: {
          raw: responsePrivateInfo.phone_numbers.ua.raw,
          decorated: responsePrivateInfo.phone_numbers.ua.decorated,
        },
        resume_path: responsePrivateInfo.resume_path,
      });
    }

    return (
      response?.data ?? {
        success: false,
        reason: "No response!",
      }
    );
  }, []);

  //* Context
  const privateInfoCtxValue = useMemo<NonNullable<PrivateInfoContextValueType>>(
    () => ({
      privateInfo,
      getPrivateInfo,
      modal: {
        open: modalOpen,
        handleOpen: () => setModalOpen(true),
        handleClose: () => setModalOpen(false),
      },
    }),
    [modalOpen, privateInfo]
  );

  //* Local Storage and URL Query
  const pinFromURL = useQueryVariable("pin");

  useEffect(() => {
    const pinInLocalStorage = pinLocalStorage.getValue();

    if (pinFromURL && !privateInfo) {
      getPrivateInfo(pinFromURL);
    }

    if (pinInLocalStorage.length > 0 && !privateInfo) {
      getPrivateInfo(pinInLocalStorage).then((result) => {
        if (!result || !result.success)
          pinLocalStorage.setValue(pinLocalStorage.defaultValue);
      });
    }
  }, []);

  return {
    modalOpen,
    privateInfoCtxValue,
  };
};

export const usePrivateInfoContext = () => {
  const privateInfoCtxValue = useContext(
    PrivateInfoContext as React.Context<
      NonNullable<PrivateInfoContextValueType>
    >
  );

  return { ...privateInfoCtxValue };
};
