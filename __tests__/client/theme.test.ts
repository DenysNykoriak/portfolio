import { act, cleanup, renderHook } from "@testing-library/react";
import {
  colorTokens,
  themeSettings,
  useThemeInitSettings,
} from "../../client/theme";

describe("Color Tokens", () => {
  test("dark theme snapshot", () => {
    const tokens = colorTokens("dark");

    expect(tokens).toMatchSnapshot("dark-theme-tokens");
  });

  test("light theme snapshot", () => {
    const tokens = colorTokens("light");

    expect(tokens).toMatchSnapshot("light-theme-tokens");
  });
});

describe("Theme Settings", () => {
  test("dark theme snapshot", () => {
    const settings = themeSettings("dark");

    expect(settings).toMatchSnapshot("dark-theme-settings");
  });

  test("light theme snapshot", () => {
    const settings = themeSettings("light");

    expect(settings).toMatchSnapshot("light-theme-settings");
  });
});

describe("useThemeInitSettings Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    cleanup();
  });

  test("theme snapshot", () => {
    const { result } = renderHook(useThemeInitSettings);

    expect(result.current.theme).toMatchSnapshot("theme");
  });

  test("test init theme mode (default should be dark) and localstorage key", () => {
    //Dark
    const { result: firstResult } = renderHook(useThemeInitSettings);
    expect(firstResult.current.themeCtxValue.themeMode).toBe("dark");
    cleanup();

    //Light
    window.localStorage.setItem("themeMode", "light");
    const { result: secondResult } = renderHook(useThemeInitSettings);
    expect(secondResult.current.themeCtxValue.themeMode).toBe("light");
  });

  test("should theme toggle", () => {
    const { result } = renderHook(useThemeInitSettings);

    const oldThemeMode = result.current.themeCtxValue.themeMode;

    act(() => {
      result.current.themeCtxValue.toggleThemeMode();
    });

    expect(result.current.themeCtxValue.themeMode).not.toBe(oldThemeMode);
  });

  test("should theme changing", () => {
    const { result } = renderHook(useThemeInitSettings);

    //First Change
    let oldThemeMode = result.current.themeCtxValue.themeMode;
    act(() => {
      result.current.themeCtxValue.setThemeMode(
        oldThemeMode === "dark" ? "light" : "dark"
      );
    });
    expect(result.current.themeCtxValue.themeMode).not.toBe(oldThemeMode);

    //Second Change
    oldThemeMode = result.current.themeCtxValue.themeMode;
    act(() => {
      result.current.themeCtxValue.setThemeMode(
        oldThemeMode === "dark" ? "light" : "dark"
      );
    });
    expect(result.current.themeCtxValue.themeMode).not.toBe(oldThemeMode);
  });
});
