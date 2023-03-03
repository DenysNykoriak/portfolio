import React, { forwardRef } from "react";
import { Stack, Typography, StackProps } from "@mui/material";
import { motion, Variants } from "framer-motion";
import PortfolioNavbar from "../PortfolioNavbar";
import { useTheme } from "../../../theme";
import AnimatedExpandMoreButton from "../../UI/AnimatedExpandMoreButton";
import { scrollPageToRef } from "../../../utility/common";

type PortfolioSection1WelcomeProps = {
  expandToRef: React.RefObject<HTMLDivElement>;
} & StackProps<"div">;

const PortfolioSection1Welcome = forwardRef<
  HTMLDivElement,
  PortfolioSection1WelcomeProps
>(({ expandToRef, ...props }, forwardedRef) => {
  const { colors } = useTheme();

  const titleInVariants: Variants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        delay: custom * 0.5,
        stiffness: 120,
      },
    }),
  };

  return (
    <Stack
      component={"div"}
      ref={forwardedRef}
      direction={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "100%",
        height: { md: "100vh", xs: "90vh" },
        p: 2,
      }}
      data-testid={"portfolio-section-1"}
      {...props}
    >
      <PortfolioNavbar />
      <Stack direction={"column"} alignItems={"center"}>
        {/* Content */}
        <Typography
          variant="h1"
          color={"primary"}
          sx={{
            fontSize: { lg: "5rem", md: "4.5rem", sm: "3.5rem", xs: "2rem" },
            fontWeight: 600,
          }}
          // Animations
          component={motion.h1}
          variants={titleInVariants}
          initial={"initial"}
          animate={"animate"}
          custom={1}
        >
          {"Nykoriak Denys"}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            typography: {
              lg: "h1",
              md: "h2",
              xs: "h4",
            },
            color: colors.nowTheme.text,
            fontWeight: 600,
          }}
          // Animations
          component={motion.h2}
          variants={titleInVariants}
          initial={"initial"}
          animate={"animate"}
          custom={2}
        >
          {"Junior Front-End Developer"}
        </Typography>
      </Stack>
      <Stack>
        <AnimatedExpandMoreButton onClick={scrollPageToRef(expandToRef)} />
      </Stack>
    </Stack>
  );
});

PortfolioSection1Welcome.displayName = "PortfolioSection1Welcome";

export default PortfolioSection1Welcome;
