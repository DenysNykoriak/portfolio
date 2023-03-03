import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { useTheme } from "../../theme";
import { useUISize } from "../../hooks/common/useUISize";

type SubtitleFontSizes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "subtitle1"
  | "subtitle2";

type PortfolioSectionSubtitleProps = {
  subtitle: string | React.ReactNode;
  fontSizes?: {
    large: SubtitleFontSizes;
    medium: SubtitleFontSizes;
    small: SubtitleFontSizes;
  };
} & TypographyProps<typeof motion.h1>;

const PortfolioSectionSubtitle: FC<PortfolioSectionSubtitleProps> = ({
  subtitle,
  fontSizes,
  ...props
}) => {
  const { colors } = useTheme();

  const [uiSize, muiTheme] = useUISize({ largeFrom: "1000px" });

  const subtitleVariants: Variants = {
    initial: {
      opacity: 0,
      x: uiSize === "large" ? -400 : -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", delay: 0.6, duration: 1.5 },
    },
  };

  const finalFontSizes = !fontSizes
    ? {
        large: muiTheme.typography.h2,
        medium: muiTheme.typography.h3,
        small: muiTheme.typography.h4,
      }
    : {
        large: muiTheme.typography[fontSizes.large],
        medium: muiTheme.typography[fontSizes.medium],
        small: muiTheme.typography[fontSizes.small],
      };

  return (
    <Typography
      variant="h2"
      color={colors.palette.gray[600]}
      sx={{
        fontSize:
          uiSize === "large"
            ? finalFontSizes.large.fontSize
            : uiSize === "medium"
            ? finalFontSizes.medium.fontSize
            : finalFontSizes.small.fontSize,
        textAlign: "center",
        willChange: "auto",
      }}
      component={motion.h2}
      variants={subtitleVariants}
      initial={"initial"}
      whileInView={"animate"}
      exit={"exit"}
      viewport={{ amount: "some", once: true }}
      {...props}
    >
      {subtitle}
    </Typography>
  );
};

export default PortfolioSectionSubtitle;
