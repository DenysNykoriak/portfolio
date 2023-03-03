import { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { useUISize } from "../../hooks/common/useUISize";

type SectionTitleProps = { title: string } & TypographyProps<typeof motion.h1>;

const PorfolioSectionTitle: FC<SectionTitleProps> = ({ title, ...props }) => {
  const [uiSize, muiTheme] = useUISize({ largeFrom: "1000px" });

  const titleVariants: Variants = {
    initial: {
      opacity: 0,
      x: uiSize === "large" ? -400 : -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", delay: 0.3, duration: 1.5 },
    },
  };

  return (
    <Typography
      variant="h1"
      color="primary"
      sx={{
        fontSize:
          uiSize === "large"
            ? "50px"
            : uiSize === "medium"
            ? "30px"
            : muiTheme.typography.h2,
        willChange: "auto",
      }}
      gutterBottom
      component={motion.h1}
      variants={titleVariants}
      initial={"initial"}
      whileInView={"animate"}
      exit={"exit"}
      viewport={{ amount: "some", once: true }}
      {...props}
    >
      {title}
    </Typography>
  );
};

export default PorfolioSectionTitle;
