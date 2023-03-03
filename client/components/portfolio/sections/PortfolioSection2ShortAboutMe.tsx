import { Stack, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useScrollTrackTranslate } from "../../../hooks/animation/useScrollTrackTranslate";
import { useWindowDimensions } from "../../../hooks/common/useWindowDimensions";
import { useTheme } from "../../../theme";
import { useRef } from "react";
import { useUISize } from "../../../hooks/common/useUISize";

type PortfolioSection2ShortAboutMeProps = object;

const PortfolioSection2ShortAboutMe = forwardRef<
  HTMLDivElement,
  PortfolioSection2ShortAboutMeProps
>(({ ...props }, forwardedRef) => {
  const { colors, themeMode } = useTheme();

  const bgTextRef = useRef<HTMLHeadingElement>(null);

  const dimensions = useWindowDimensions();
  const bgXtranslate = useScrollTrackTranslate({
    movableRef: bgTextRef,
    dimensions,
    direction: "Horizontal",
  });

  const [uiSize, muiTheme] = useUISize({ largeFrom: "1000px" });

  return (
    <Stack
      component={"div"}
      ref={forwardedRef}
      direction={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "100%",
        height: "30vh",
        p: 2,
        position: "relative",
      }}
      data-testid={"portfolio-section-2"}
      {...props}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          height: "80%",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h1"
          color={
            themeMode === "dark"
              ? colors.palette.gray[800]
              : colors.palette.gray[700]
          }
          sx={{
            display: "inline-block",
            fontFamily: "Verdana, sans-serif",
            fontSize:
              uiSize === "large"
                ? "9.5vw"
                : uiSize === "medium"
                ? "6vw"
                : muiTheme.typography.h2,
            fontWeight: "800",
            wordSpacing: uiSize === "large" ? "-30px" : undefined,
            letterSpacing: uiSize === "large" ? "-5px" : undefined,
            position: "relative",
            ...(uiSize === "large"
              ? {
                  top: "50%",
                  transform: "translateY(-50%)",
                }
              : {}),
          }}
          ref={bgTextRef}
          component={motion.h1}
          //Animations
          animate={{
            left: bgXtranslate,
          }}
        >
          SHORT ABOUT ME
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          textAlign: uiSize === "large" ? "start" : "center",
          width: uiSize === "large" ? "45%" : "85%",
          px: 2,
          height: "80%",
          right: uiSize === "large" ? 0 : undefined,
          mt: uiSize === "medium" ? "20px" : undefined,
          mx: uiSize !== "large" ? "auto" : undefined,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          ...(uiSize === "large"
            ? {
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "-10px",
                  width: "3px",
                  height: "70%",
                  borderRadius: "15px",
                  bgcolor: colors.palette.primary[400],
                },
              }
            : {
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "40px",
                  width: "95%",
                  height: "3px",
                  borderRadius: "15px",
                  bgcolor: colors.palette.primary[400],
                },
              }),
        }}
      >
        <Typography
          component={"h3"}
          variant={uiSize !== "small" ? "h3" : "h5"}
          color={colors.nowTheme.text}
        >
          A developer who adores to create various complex logics, and who likes
          neatness in the code
        </Typography>
      </Box>
    </Stack>
  );
});

PortfolioSection2ShortAboutMe.displayName = "PortfolioSection2ShortAboutMe";

export default PortfolioSection2ShortAboutMe;
