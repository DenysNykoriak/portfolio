import { Stack, StackProps } from "@mui/material";
import { forwardRef } from "react";
import { useUISize } from "../../../hooks/common/useUISize";
import PortfolioSectionSubtitle from "../PortfolioSectionSubtitle";
import PorfolioSectionTitle from "../PortfolioSectionTitle";

type PortfolioSection6MoreAboutMeProps = StackProps;

const PortfolioSection6MoreAboutMe = forwardRef<
  HTMLDivElement,
  PortfolioSection6MoreAboutMeProps
>(({ ...props }, forwardedRef) => {
  const [uiSize] = useUISize({ withoutLarge: true });

  return (
    <Stack
      component={"div"}
      direction={"column"}
      alignItems={"center"}
      ref={forwardedRef}
      sx={{
        width: uiSize === "medium" ? "60%" : "95%",
        mb: 2,
      }}
      data-testid={"portfolio-section-6"}
      {...props}
    >
      <PorfolioSectionTitle title="More About Me" />
      <PortfolioSectionSubtitle
        subtitle="Since I have created my first working discord bot, I realised that I want to connect my life with programming"
        gutterBottom
        variant="h3"
      />
      <PortfolioSectionSubtitle
        subtitle="From that day I never stopped learning and improving my skills. I have ability to learn quickly, easily finding common language with different people"
        gutterBottom
        variant="h3"
      />
      <PortfolioSectionSubtitle
        subtitle="I am looking for a long-term job where I could grow professionally, improve my skills and learn latest technologies"
        gutterBottom
        variant="h3"
      />
    </Stack>
  );
});

PortfolioSection6MoreAboutMe.displayName = "PortfolioSection6MoreAboutMe";

export default PortfolioSection6MoreAboutMe;
