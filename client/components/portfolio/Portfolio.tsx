import { Stack } from "@mui/material";
import { useRef } from "react";
import { withPrivateInfo } from "../../hocs/withPrivateInfo";
import { useTheme } from "../../theme";
import PortfolioFooter from "./PortfolioFooter";
import PortfolioSection1Welcome from "./sections/PortfolioSection1Welcome";
import PortfolioSection2ShortAboutMe from "./sections/PortfolioSection2ShortAboutMe";
import PortfolioSection3WorkExperience from "./sections/PortfolioSection3WorkExperience";
import PortfolioSection4Skills from "./sections/PortfolioSection4Skills";
import PortfolioSection5Timeline from "./sections/PortfolioSection5Timeline";
import PortfolioSection6MoreAboutMe from "./sections/PortfolioSection6MoreAboutMe";
import PortfolioSection7ContactMe from "./sections/PortfolioSection7ContactMe";

const Portfolio = () => {
  const { colors } = useTheme();

  const section2Ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Stack
        component={"div"}
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        bgcolor={colors.nowTheme.bg.primary}
        sx={{
          minHeight: "100vh",
        }}
      >
        <PortfolioSection1Welcome expandToRef={section2Ref} />
        <PortfolioSection2ShortAboutMe ref={section2Ref} />
        <PortfolioSection3WorkExperience />
        <PortfolioSection4Skills />
        <PortfolioSection5Timeline />
        <PortfolioSection6MoreAboutMe />
        <PortfolioSection7ContactMe />
        <PortfolioFooter />
      </Stack>
    </>
  );
};

export default withPrivateInfo(Portfolio);
