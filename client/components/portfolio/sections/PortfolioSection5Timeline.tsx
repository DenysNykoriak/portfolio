import { forwardRef } from "react";
import { Stack, StackProps } from "@mui/material";
import PortfolioTimeline from "../PortfolioTimeline";
import PorfolioSectionTitle from "../PortfolioSectionTitle";

type PortfolioSection5TimelineProps = StackProps<"div">;

const PortfolioSection5Timeline = forwardRef<
  HTMLDivElement,
  PortfolioSection5TimelineProps
>(({ ...props }, forwardedRef) => {
  return (
    <Stack
      component={"div"}
      ref={forwardedRef}
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      data-testid={"portfolio-section-5"}
      {...props}
    >
      <PorfolioSectionTitle title="Timeline" />
      <PortfolioTimeline />
    </Stack>
  );
});

PortfolioSection5Timeline.displayName = "PortfolioSection5Timeline";

export default PortfolioSection5Timeline;
