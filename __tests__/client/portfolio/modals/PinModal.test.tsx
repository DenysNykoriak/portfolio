import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import PinModal from "../../../../client/components/login/PinModal";
import { PrivateInfoWrapper } from "../../../helpers/wrappers";

describe("PinModal", () => {
  const mockPrivateInfo = {
    phone_number: {
      raw: "RAW_PHONE",
      decorated: "DECORATED_PHONE",
    },
    resume_path: "RESUME_PATH",
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("renders with correct title and description", () => {
    render(<PinModal />, {
      wrapper: new PrivateInfoWrapper().setWithTheme(true).setMock({
        privateInfoCtxValue: {
          getPrivateInfo: jest.fn(),
          privateInfo: mockPrivateInfo,
          modal: {
            open: true,
            handleOpen: jest.fn(),
            handleClose: jest.fn(),
          },
        },
      }).Wrapper,
    });
    expect(screen.getByText("Pin Access")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter pin code to see my contact information")
    ).toBeInTheDocument();
  });

  test("displays error message when pin is incorrect", async () => {
    render(<PinModal />, {
      wrapper: new PrivateInfoWrapper().setWithTheme(true).setMock({
        privateInfoCtxValue: {
          getPrivateInfo: async () => ({
            success: false,
            reason: "Invalid pin",
          }),
          privateInfo: mockPrivateInfo,
          modal: {
            open: true,
            handleOpen: jest.fn(),
            handleClose: jest.fn(),
          },
        },
      }).Wrapper,
    });
    const input = screen.getByLabelText("Pin");
    const submitButton = screen.getByText("Get contact information");

    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid pin")).toBeInTheDocument();
    });
  });

  test("closes modal when pin is correct", async () => {
    const getPrivateInfo = jest.fn().mockResolvedValue({ success: true });
    const modal = {
      open: true,
      handleOpen: jest.fn(),
      handleClose,
    };

    function handleClose() {
      modal.open = false;
    }

    const spyHandleClose = jest.spyOn(modal, "handleClose");

    render(<PinModal />, {
      wrapper: new PrivateInfoWrapper().setWithTheme(true).setMock({
        privateInfoCtxValue: {
          getPrivateInfo,
          privateInfo: mockPrivateInfo,
          modal,
        },
      }).Wrapper,
    });
    const input = screen.getByLabelText("Pin");
    const submitButton = screen.getByText("Get contact information");

    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getPrivateInfo).toHaveBeenCalledWith("1234");
      expect(screen.queryByTestId("pin-dialog")).not.toBeInTheDocument();
      expect(spyHandleClose).toHaveBeenCalled();
    });
  });
});
