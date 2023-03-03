import { ThemeOptions } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material";
import { LocalStorageUtility } from "./utility/LocalStorageUtility";

//* Types --------------------------------------
type ThemeModeType = "dark" | "light";

type ThemeContextValueType = {
  themeMode: ThemeModeType;
  toggleThemeMode: () => void;
  setThemeMode: (mode: ThemeModeType) => void;
} | null;

type ColorPaletteType = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

type ThemeColorsType = {
  text: string;
  bg: {
    primary: string;
    second: string;
  };
};

type ColorTokensType = {
  palette: {
    primary: ColorPaletteType;
    secondary: ColorPaletteType;
    gray: ColorPaletteType;
  };
  common: {
    white: string;
    black: string;
  };
  nowTheme: ThemeColorsType;
  lightTheme: ThemeColorsType;
  darkTheme: ThemeColorsType;
};

//* Color Tokens --------------------------------------
export const colorTokens = (mode: ThemeModeType): ColorTokensType => {
  const darkThemeColors: ThemeColorsType = {
    text: "#ECF0F1",
    bg: {
      primary: "#262828",
      second: "#1e2020",
    },
  };

  const lightThemeColors: ThemeColorsType = {
    text: "#000000",
    bg: {
      primary: "#F8F9F9",
      second: "#e9e9e9",
    },
  };

  return {
    palette:
      mode === "dark"
        ? {
            //Dark Mode
            primary: {
              100: "#ffe5dc",
              200: "#ffccb9",
              300: "#ffb296",
              400: "#ff9973",
              500: "#ff7f50",
              600: "#cc6640",
              700: "#994c30",
              800: "#663320",
              900: "#331910",
            },
            secondary: {
              100: "#f8d6e0",
              200: "#f2adc1",
              300: "#eb83a1",
              400: "#e55a82",
              500: "#de3163",
              600: "#b2274f",
              700: "#851d3b",
              800: "#591428",
              900: "#2c0a14",
            },
            gray: {
              100: "#f2f4f4",
              200: "#e5e9ea",
              300: "#d9dfdf",
              400: "#ccd4d5",
              500: "#bfc9ca",
              600: "#99a1a2",
              700: "#737979",
              800: "#4c5051",
              900: "#262828",
            },
          }
        : {
            //Light Mode
            primary: {
              900: "#ffe5dc",
              800: "#ffccb9",
              700: "#ffb296",
              600: "#ff9973",
              500: "#FF8558",
              400: "#ff7f50",
              300: "#994c30",
              200: "#663320",
              100: "#331910",
            },
            secondary: {
              900: "#f8d6e0",
              800: "#f2adc1",
              700: "#eb83a1",
              600: "#e55a82",
              500: "#de3163",
              400: "#b2274f",
              300: "#851d3b",
              200: "#591428",
              100: "#2c0a14",
            },
            gray: {
              100: "#262828",
              200: "#4c5051",
              300: "#737979",
              400: "#99a1a2",
              500: "#bfc9ca",
              600: "#ccd4d5",
              700: "#d9dfdf",
              800: "#e5e9ea",
              900: "#f2f4f4",
            },
          },

    nowTheme: mode === "dark" ? darkThemeColors : lightThemeColors,
    lightTheme: lightThemeColors,
    darkTheme: darkThemeColors,
    common: {
      white: "#FBFCFC",
      black: "#17202A",
    },
  };
};

//* Theme Settings --------------------------------------
const fontFamily = ["Libre_Franklin", "sans-serif"].join(",");
const defaultTheme: ThemeModeType = "dark";

export const themeSettings = (mode: ThemeModeType): ThemeOptions => {
  const colors = colorTokens(mode);

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            //* Dark Mode
            primary: {
              main: colors.palette.primary[400],
              light: colors.palette.primary[200],
              dark: colors.palette.primary[700],
            },
            secondary: {
              main: colors.palette.secondary[400],
              light: colors.palette.secondary[200],
              dark: colors.palette.secondary[700],
            },
            neutral: {
              main: colors.palette.gray[400],
              light: colors.palette.gray[200],
              dark: colors.palette.gray[700],
            },
            background: {
              default: colors.darkTheme.bg.primary,
              paper: colors.darkTheme.bg.second,
            },
          }
        : {
            //* Light Mode
            primary: {
              main: colors.palette.primary[400],
              light: colors.palette.primary[200],
              dark: colors.palette.primary[700],
            },
            secondary: {
              main: colors.palette.secondary[400],
              light: colors.palette.secondary[200],
              dark: colors.palette.secondary[700],
            },
            neutral: {
              main: colors.palette.gray[400],
              light: colors.palette.gray[200],
              dark: colors.palette.gray[700],
            },
            background: {
              default: colors.lightTheme.bg.primary,
              paper: colors.lightTheme.bg.second,
            },
          }),
    },
    typography: {
      fontFamily,
      fontSize: 14,
      h1: {
        fontFamily,
        fontSize: 40,
      },
      h2: {
        fontFamily,
        fontSize: 32,
      },
      h3: {
        fontFamily,
        fontSize: 24,
      },
      h4: {
        fontFamily,
        fontSize: 20,
      },
      h5: {
        fontFamily,
        fontSize: 16,
      },
      h6: {
        fontFamily,
        fontSize: 14,
      },
    },
  };
};

//* ---

const nowTheme = new LocalStorageUtility<ThemeModeType>(
  "themeMode",
  defaultTheme
);

export const ThemeContext = createContext<ThemeContextValueType>(null);

export const useThemeInitSettings = () => {
  const [themeMode, setThemeMode] = useState<ThemeModeType>(
    nowTheme.getValue()
  );

  const themeCtxValue = useMemo<NonNullable<ThemeContextValueType>>(
    () => ({
      themeMode,
      toggleThemeMode: () => {
        setThemeMode((prev) => {
          const newMode = prev === "dark" ? "light" : "dark";
          nowTheme.setValue(newMode);
          return newMode;
        });
      },
      setThemeMode: (newMode) => {
        setThemeMode(newMode);
        nowTheme.setValue(newMode);
      },
    }),
    [themeMode]
  );

  const theme = useMemo(() => {
    return createTheme(themeSettings(themeMode));
  }, [themeMode]);

  return {
    theme,
    themeCtxValue,
  };
};

export const useTheme = () => {
  const { themeMode, toggleThemeMode, setThemeMode } = useContext(
    ThemeContext as React.Context<NonNullable<ThemeContextValueType>>
  );

  const colors = useMemo(() => colorTokens(themeMode), [themeMode]);

  return {
    themeMode,
    toggleThemeMode,
    setThemeMode,
    colors,
  };
};
