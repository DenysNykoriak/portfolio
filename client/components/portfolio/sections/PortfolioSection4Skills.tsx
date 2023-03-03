import { Stack, StackProps } from "@mui/material";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import { forwardRef, useState } from "react";
import PortfolioSkillCard from "../PortfolioSkillCard";
import PorfolioSectionTitle from "../PortfolioSectionTitle";
import { motion } from "framer-motion";

type PortfolioSection4SkillsProps = StackProps<typeof motion.div>;

const PortfolioSection4Skills = forwardRef<
  HTMLDivElement,
  PortfolioSection4SkillsProps
>(({ ...props }, forwardedRef) => {
  const [prevSkillCardHeight, setPrevSkillCardHeight] = useState(0);
  const [skillCardHeight, setSkillCardHeight] = useState(0);

  const changeCardHeight = (height: number) => {
    setPrevSkillCardHeight(skillCardHeight);
    setSkillCardHeight(height);
  };

  return (
    <Stack
      component={motion.div}
      ref={forwardedRef}
      direction={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{
        width: "100%",
        mb: 2,
        p: 2,
        overflow: "hidden",
      }}
      animate={{
        height: `${
          skillCardHeight + (prevSkillCardHeight > skillCardHeight ? 120 : 200)
        }px`,
        transition: {
          duration: 0.5,
          delay: prevSkillCardHeight < skillCardHeight ? 0 : 0.2,
        },
      }}
      data-testid={"portfolio-section-4"}
      {...props}
    >
      <PorfolioSectionTitle title="Skills" />
      <PortfolioSkillCard
        changeCardHeight={changeCardHeight}
        pages={[
          {
            title: "Soft Skills",
            icon: <FlashOnOutlinedIcon />,
            skills: {
              type: "simple",
              value: [
                "Self-Management",
                "Positivity",
                "Teamwork and conflictresolution",
                "Adaptability",
                "Communication",
                "Listening",
                "Critical thinking",
                "Stress resilience",
              ],
            },
          },
          {
            title: "Hard Skills",
            icon: <FlashOnOutlinedIcon />,
            skills: {
              type: "groups",
              value: [
                {
                  name: "Basic",
                  skills: [
                    "HTML/CSS",
                    "Javascript",
                    "Typescript",
                    "SASS",
                    "Node JS",
                  ],
                },
                {
                  name: "Frameworks",
                  skills: ["React", "Express.js", "Next.js (Basic)"],
                },
                {
                  name: "Other",
                  skills: [
                    "Material UI",
                    "Webpack (Basic)",
                    "Git",
                    "Animations (framer-motion)",
                    "Websocket (+Socket.IO)",
                  ],
                },
              ],
            },
          },
          {
            title: "Language Skills",
            icon: <FlashOnOutlinedIcon />,
            skills: {
              type: "simple",
              value: [
                "Ukrainian - Native",
                "Russian - Advanced",
                "English - Intermediate (Low speaking practice / high understanding level)",
              ],
            },
          },
        ]}
      />
    </Stack>
  );
});

PortfolioSection4Skills.displayName = "PortfolioSection4Skills";

export default PortfolioSection4Skills;
