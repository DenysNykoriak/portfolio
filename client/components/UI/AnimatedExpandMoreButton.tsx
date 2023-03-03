import { IconButton, IconButtonProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, MotionProps } from "framer-motion";
import { FC } from "react";

type AnimatedExpandMoreButtonProps = {
  duration?: number;
} & IconButtonProps<"button"> &
  MotionProps;

const AnimatedExpandMoreButton: FC<AnimatedExpandMoreButtonProps> = ({
  duration,
  ...props
}) => {
  return (
    <IconButton
      color="primary"
      size="large"
      // Animations
      component={motion.button}
      animate={{
        y: [0, 10, -10],
        transition: {
          duration: duration ?? 2,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      {...props}
    >
      <ExpandMoreIcon fontSize="large" />
    </IconButton>
  );
};

export default AnimatedExpandMoreButton;
