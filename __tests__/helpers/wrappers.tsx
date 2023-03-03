import { ThemeProvider } from "@mui/material";
import { ThemeContext, useThemeInitSettings } from "../../client/theme";
import { usePrivateInfo, PrivateInfoContext } from "../../client/privateInfo";

type WrapperProps = {
  children: React.ReactNode;
};

//* Theme
export class ThemeWrapper {
  private Component({ children }: WrapperProps) {
    const { themeCtxValue, theme } = useThemeInitSettings();

    return (
      <>
        <ThemeContext.Provider value={themeCtxValue}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
      </>
    );
  }

  Wrapper = this.Component.bind(this);

  static SimpleWrapper = new ThemeWrapper().Wrapper;
}

//* Private info
type PrivateInfoMock = {
  privateInfoCtxValue: ReturnType<typeof usePrivateInfo>["privateInfoCtxValue"];
};

export class PrivateInfoWrapper {
  private privateInfoCtxValue?: PrivateInfoMock["privateInfoCtxValue"];
  private withTheme = false;

  private Component({ children }: WrapperProps) {
    const ctxValue =
      this.privateInfoCtxValue ?? usePrivateInfo().privateInfoCtxValue;

    if (this.withTheme) {
      return (
        <>
          <ThemeWrapper.SimpleWrapper>
            <PrivateInfoContext.Provider value={ctxValue}>
              {children}
            </PrivateInfoContext.Provider>
          </ThemeWrapper.SimpleWrapper>
        </>
      );
    }

    return (
      <>
        <PrivateInfoContext.Provider value={ctxValue}>
          {children}
        </PrivateInfoContext.Provider>
      </>
    );
  }

  Wrapper = this.Component.bind(this);

  setMock(mock: PrivateInfoMock) {
    this.privateInfoCtxValue = mock.privateInfoCtxValue;

    return this;
  }

  setWithTheme(state: boolean) {
    this.withTheme = state;

    return this;
  }

  static SimpleWrapper = new PrivateInfoWrapper().Wrapper;
}
