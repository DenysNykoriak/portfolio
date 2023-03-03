import { Stack, Box, Typography, StackProps } from "@mui/material";
import { motion, Variants, MotionProps } from "framer-motion";
import React, { FC } from "react";
import { useUISize } from "../../hooks/common/useUISize";
import { useTheme } from "../../theme";
import DownloadResumeButton from "../common/DownloadResumeButton";
import ThemeModeButton from "../common/ThemeModeButton";

export type PortfolioNavbarProps = StackProps<"nav"> & MotionProps;

const PortfolioNavbar: FC<PortfolioNavbarProps> = ({ ...props }) => {
  const { colors } = useTheme();

  const navbarVariants: Variants = {
    initial: {
      y: 0,
      opacity: 0,
    },
    animate: {
      y: [-40, 0],
      opacity: 1,
      transition: {
        type: "spring",
        duration: 2,
      },
    },
  };

  const [uiSize] = useUISize({ withoutLarge: true });

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "95%",
        mx: "auto",
      }}
      component={motion.nav}
      variants={navbarVariants}
      initial={"initial"}
      animate={"animate"}
      viewport={{ amount: "some", once: true }}
      {...props}
    >
      {/* Title */}
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h2"
          color={colors.nowTheme.text}
          sx={{
            typography: {
              md: "h2",
              sm: "h3",
              xs: "h4",
            },
          }}
        >
          Portfolio
        </Typography>
      </Box>
      {/* Right Side */}
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={2}
        sx={{
          flexGrow: 4,
        }}
      >
        <ThemeModeButton IconProps={{ fontSize: uiSize }} />
        <DownloadResumeButton
          size={uiSize}
          TextProps={{ variant: uiSize === "medium" ? "body1" : "body2" }}
        />
      </Stack>
    </Stack>
  );
};

export default PortfolioNavbar;
