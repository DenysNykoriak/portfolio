import { forwardRef } from "react";
import { Stack, StackProps, IconButton, Link } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PorfolioSectionTitle from "../PortfolioSectionTitle";
import { Variants, motion } from "framer-motion";
import { useUISize } from "../../../hooks/common/useUISize";
import { usePrivateInfoContext } from "../../../privateInfo";

type PortfolioSection7ContactMeProps = StackProps;

const PortfolioSection7ContactMe = forwardRef<
  HTMLDivElement,
  PortfolioSection7ContactMeProps
>(({ ...props }, forwardedRef) => {
  const { privateInfo, modal: privateInfoModal } = usePrivateInfoContext();

  const [uiSize] = useUISize({ withoutLarge: true });

  const textVariants: Variants = {
    initial: {
      opacity: 0,
      x: uiSize === "medium" ? -400 : -100,
    },
    animate: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { type: "spring", delay: custom * 0.3, duration: 1.5 },
    }),
  };

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      ref={forwardedRef}
      data-testid={"portfolio-section-7"}
      {...props}
    >
      <PorfolioSectionTitle title="Contact Me" gutterBottom={false} />
      {/* Email */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        component={motion.div}
        variants={textVariants}
        initial={"initial"}
        whileInView={"animate"}
        custom={0}
        viewport={{ amount: "some", once: true }}
      >
        <IconButton href="mailto:denys.nykoriak@gmail.com">
          <EmailOutlinedIcon />
        </IconButton>
        <Link
          color={"text.secondary"}
          component={"a"}
          variant={uiSize === "small" ? "body1" : "h3"}
          underline="none"
          sx={{ cursor: "pointer" }}
          href="mailto:denys.nykoriak@gmail.com"
        >
          denys.nykoriak@gmail.com
        </Link>
      </Stack>
      {/* Phone Number */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          mb: 2,
        }}
        component={motion.div}
        variants={textVariants}
        initial={"initial"}
        whileInView={"animate"}
        custom={1}
        viewport={{ amount: "some", once: true }}
      >
        <IconButton
          {...(privateInfo
            ? { href: `tel:${privateInfo.phone_number.raw}` }
            : { onClick: privateInfoModal.handleOpen })}
        >
          <LocalPhoneOutlinedIcon />
        </IconButton>
        <Link
          color={"text.secondary"}
          component={"a"}
          variant={uiSize === "small" ? "body1" : "h3"}
          underline="none"
          sx={{ cursor: "pointer" }}
          {...(privateInfo
            ? { href: `tel:${privateInfo.phone_number.raw}` }
            : { onClick: privateInfoModal.handleOpen })}
        >
          {privateInfo?.phone_number.decorated ?? "+38 (***) ** ** ***"}
        </Link>
      </Stack>
    </Stack>
  );
});

PortfolioSection7ContactMe.displayName = "PortfolioSection7ContactMe";

export default PortfolioSection7ContactMe;
