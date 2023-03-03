import { FC } from "react";
import { IconButton, IconButtonProps, SvgIconProps } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "../../theme";

type ThemeModeButtonProps = {
  IconProps?: SvgIconProps;
} & IconButtonProps;

const ThemeModeButton: FC<ThemeModeButtonProps> = ({ IconProps, ...props }) => {
  const { themeMode, toggleThemeMode } = useTheme();

  return (
    <IconButton onClick={toggleThemeMode} {...props}>
      {themeMode === "dark" ? (
        <LightModeOutlinedIcon {...IconProps} />
      ) : (
        <DarkModeOutlinedIcon {...IconProps} />
      )}
    </IconButton>
  );
};

export default ThemeModeButton;
