import { act, cleanup, renderHook } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import clone from "just-clone";
import { usePrivateInfo } from "../../client/privateInfo";
import { PrivateInfoResponseType } from "../../pages/api/private_info";

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("usePrivateInfo Hook", () => {
  let successfulResponse: AxiosResponse<PrivateInfoResponseType>;
  let failedResponse: AxiosResponse<PrivateInfoResponseType>;

  beforeAll(() => {
    successfulResponse = {
      data: {
        success: true,
        info: {
          phone_numbers: {
            ua: {
              raw: "RAW_PHONE",
              decorated: "DECORATED_PHONE",
            },
          },
          resume_path: "RESUME_PATH",
        },
      },
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {} as never,
    };

    failedResponse = {
      data: {
        success: false,
        reason: "REASON",
      },
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {} as never,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    cleanup();
  });

  //Modal
  test("pin modal should be closed on init", () => {
    const { result } = renderHook(usePrivateInfo);
    expect(result.current.modalOpen).toBeFalsy();
  });

  test("pin modal handlers should open and close modal", () => {
    const { result } = renderHook(usePrivateInfo);

    //Open
    act(() => {
      result.current.privateInfoCtxValue.modal.handleOpen();
    });
    expect(result.current.modalOpen).toBeTruthy();

    //Close
    act(() => {
      result.current.privateInfoCtxValue.modal.handleClose();
    });
    expect(result.current.modalOpen).toBeFalsy();
  });

  //Context
  test("private info context should be defined", () => {
    const { result } = renderHook(usePrivateInfo);
    expect(result.current.privateInfoCtxValue).toBeDefined();
    expect(result.current.privateInfoCtxValue).not.toBeNull();
  });

  //Request to backend
  test("should axios.get runned only 1 time", async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve(successfulResponse));

    const { result } = renderHook(usePrivateInfo);

    const spyAxiosGet = jest.spyOn(axios, "get");

    await act(async () => {
      await result.current.privateInfoCtxValue.getPrivateInfo("");
    });

    expect(spyAxiosGet).toBeCalledTimes(1);
  });

  test("test undefined response from backend", async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve(undefined));

    const { result } = renderHook(usePrivateInfo);

    await act(async () => {
      const obtainedResult =
        await result.current.privateInfoCtxValue.getPrivateInfo("");

      expect(obtainedResult).toEqual({
        success: false,
        reason: "No response!",
      });
    });
  });

  test("test mock successful response from backend", async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve(successfulResponse));

    const { result } = renderHook(usePrivateInfo);

    const oldPrivateInfo = clone(
      result.current.privateInfoCtxValue.privateInfo ?? {}
    );

    await act(async () => {
      await result.current.privateInfoCtxValue.getPrivateInfo("");
    });

    expect(oldPrivateInfo).not.toEqual(
      result.current.privateInfoCtxValue.privateInfo
    );

    expect(result.current.privateInfoCtxValue.privateInfo?.resume_path).toBe(
      "RESUME_PATH"
    );
  });

  test("test mock failed response from backend", async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve(failedResponse));

    const { result } = renderHook(usePrivateInfo);

    const oldPrivateInfo = clone(
      result.current.privateInfoCtxValue.privateInfo ?? {}
    );

    await act(async () => {
      await result.current.privateInfoCtxValue.getPrivateInfo("");
    });

    expect(oldPrivateInfo).toEqual(
      result.current.privateInfoCtxValue.privateInfo ?? {}
    );
  });

  //Pin in localstorage and url query
  test("should pin in localstorage call request func", async () => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
    mockedAxios.get.mockReturnValue(Promise.resolve(successfulResponse));

    const testPin = "SOME_PIN";

    const spyRequest = jest.spyOn(axios, "get");

    window.localStorage.setItem("pin", testPin);

    renderHook(usePrivateInfo);

    expect(spyRequest).toBeCalledTimes(1);
    expect(mockedAxios.get.mock.calls[0][1]?.params.pin).toBe(testPin);
  });

  test("should pin in url query call request func", async () => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());
    mockedAxios.get.mockReturnValue(Promise.resolve(successfulResponse));

    const testPin = "SOME_PIN";

    const spyRequest = jest.spyOn(axios, "get");

    Object.defineProperty(window, "location", {
      value: {
        ...window.location,
        search: `?pin=${testPin}`,
      },
      writable: true,
    });

    renderHook(usePrivateInfo);

    expect(spyRequest).toBeCalledTimes(1);
    expect(mockedAxios.get.mock.calls[0][1]?.params.pin).toBe(testPin);

    //
    Object.defineProperty(window, "location", {
      value: {
        ...window.location,
        search: "",
      },
      writable: true,
    });
  });
});
