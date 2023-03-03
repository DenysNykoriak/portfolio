import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme, useTheme as useMUITheme } from "@mui/material/styles";

type UISizeType = "small" | "medium" | "large";

type UseUISizeOptions = {
  withoutLarge?: boolean;
  largeFrom?: string;
};

export const useUISize = (options?: UseUISizeOptions): [UISizeType, Theme] => {
  const muiTheme = useMUITheme();
  const mediumSize = useMediaQuery(muiTheme.breakpoints.up("sm"));
  const largeSize = useMediaQuery(
    !options?.largeFrom
      ? muiTheme.breakpoints.up("lg")
      : `(min-width:${options.largeFrom})`
  );

  const uiSize: UISizeType =
    largeSize && (options?.withoutLarge ?? false) === false
      ? "large"
      : mediumSize
      ? "medium"
      : "small";

  return [uiSize, muiTheme];
};
