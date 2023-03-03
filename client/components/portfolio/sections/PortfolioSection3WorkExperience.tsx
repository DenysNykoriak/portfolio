import { Box, Stack, StackProps } from "@mui/material";
import React, { forwardRef } from "react";
import PortfolioSectionSubtitle from "../PortfolioSectionSubtitle";
import PorfolioSectionTitle from "../PortfolioSectionTitle";

type PortfolioSection3WorkExperienceProps = StackProps;

const PortfolioSection3WorkExperience = forwardRef<
  HTMLDivElement,
  PortfolioSection3WorkExperienceProps
>(({ ...props }, forwardedRef) => {
  return (
    <Stack
      component={"div"}
      ref={forwardedRef}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        maxWidth: "75%",
        mx: "auto",
        mb: 4,
      }}
      data-testid={"portfolio-section-3"}
      {...props}
    >
      <PorfolioSectionTitle title="Work Experience" />

      <Stack direction={"column"} gap={4}>
        <Box>
          <PortfolioSectionSubtitle subtitle={"Trading bot"} gutterBottom />
          <PortfolioSectionSubtitle
            subtitle={"January 2022 - May 2022"}
            fontSizes={{ large: "h4", medium: "h5", small: "h6" }}
            color={"primary"}
            gutterBottom
          />
          <PortfolioSectionSubtitle
            subtitle={
              "I created and developed my own trading bot for cryptocurrency marketplace Immutable X on Ethereum"
            }
            gutterBottom
          />
        </Box>
        <Box>
          <PortfolioSectionSubtitle
            subtitle={"Wordpress Social Media"}
            gutterBottom
          />
          <PortfolioSectionSubtitle
            subtitle={"August 2020 - January 2021"}
            fontSizes={{ large: "h4", medium: "h5", small: "h6" }}
            color={"primary"}
            gutterBottom
          />
          <PortfolioSectionSubtitle
            subtitle={
              "I was developing custom plugin for gaming social network on Wordpress"
            }
            gutterBottom
          />
        </Box>
        <Box>
          <PortfolioSectionSubtitle subtitle={"Discord"} gutterBottom />
          <PortfolioSectionSubtitle
            subtitle={"May 2019 - July 2020"}
            fontSizes={{ large: "h4", medium: "h5", small: "h6" }}
            color={"primary"}
            gutterBottom
          />
          <PortfolioSectionSubtitle
            subtitle={
              "I developed my own bots for discord servers with different difficulty levels"
            }
            gutterBottom
          />
        </Box>
      </Stack>
    </Stack>
  );
});

PortfolioSection3WorkExperience.displayName = "PortfolioSection3WorkExperience";

export default PortfolioSection3WorkExperience;
