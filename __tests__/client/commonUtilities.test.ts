import { cleanup, renderHook } from "@testing-library/react";
import { scrollPageToRef } from "../../client/utility/common";
import { useRef } from "react";

describe("scrollPageToRef", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("scrolls to the given ref using smooth behavior", () => {
    const {
      result: { current: mockRef },
    } = renderHook(() =>
      useRef({ scrollIntoView: jest.fn() } as unknown as HTMLDivElement)
    );

    const scrollToRef = scrollPageToRef(mockRef);
    scrollToRef();

    expect(mockRef.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });
});
