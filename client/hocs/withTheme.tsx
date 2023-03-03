import { ThemeProvider } from "@mui/material";
import { FC } from "react";
import { ThemeContext, useThemeInitSettings } from "../theme";

export function withTheme<WrappedProps extends object>(
  WrappedComponent: FC<WrappedProps>
) {
  return function withThemeHOC(props: WrappedProps) {
    const { themeCtxValue, theme } = useThemeInitSettings();

    return (
      <>
        <ThemeContext.Provider value={themeCtxValue}>
          <ThemeProvider theme={theme}>
            <WrappedComponent {...props} />
          </ThemeProvider>
        </ThemeContext.Provider>
      </>
    );
  };
}
