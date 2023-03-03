import React, { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  BoxProps,
  Card,
  CardActions,
  CardContent,
  CardProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useTheme } from "../../theme";

type PortfolioSkillCardProps = {
  changeCardHeight?: (height: number) => void;
  pages: {
    title: string;
    icon: React.ReactElement;
    CardProps?: CardProps<"div">;
    skills:
      | {
          type: "simple";
          value: string[];
        }
      | {
          type: "groups";
          value: {
            name: string;
            skills: string[];
          }[];
        };
  }[];
} & BoxProps;

const PortfolioSkillCard: FC<PortfolioSkillCardProps> = ({
  pages,
  changeCardHeight,
  ...props
}) => {
  if (pages.length === 0) return <></>;

  const { colors } = useTheme();

  const cardRef = useRef<HTMLDivElement>(null);
  const [nowPage, setNowPage] = useState(0);

  const nowPageProps = pages[nowPage];
  const nextPageProps = pages[nowPage + 1] ?? nowPageProps;
  const prevPageProps = pages[nowPage - 1] ?? nowPageProps;

  const turnPage = (to: "next" | "prev") => () => {
    const pageNum =
      to === "next" && pages[nowPage + 1]
        ? nowPage + 1
        : to === "prev" && pages[nowPage - 1]
        ? nowPage - 1
        : nowPage;

    setNowPage(pageNum);
  };

  useEffect(() => {
    if (changeCardHeight && cardRef.current)
      changeCardHeight(cardRef.current.clientHeight);
  }, [nowPage]);

  const cardVariants: Variants = {
    initial: {
      y: -100,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        stiffness: 120,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        stiffness: 120,
      },
    },
  };

  return (
    <Box ref={cardRef} {...props}>
      <AnimatePresence mode={"popLayout"}>
        <Card
          key={nowPageProps.title}
          component={motion.div}
          variants={cardVariants}
          initial={"initial"}
          whileInView={"enter"}
          exit={"exit"}
          viewport={{ amount: 0.5, once: true }}
          {...nowPageProps.CardProps}
          sx={{
            bgcolor: colors.nowTheme.bg.second,
            borderRadius: "15px",
            ...nowPageProps.CardProps?.sx,
          }}
        >
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={1}
              sx={{
                mb: 2,
              }}
            >
              {nowPageProps.icon}
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                }}
              >
                {nowPageProps.title}
              </Typography>
            </Stack>
            <Stack direction={"column"}>
              {nowPageProps.skills.type === "simple" ? (
                <>
                  {/* Simple */}
                  <Typography variant="body1">
                    {nowPageProps.skills.value.join(", ")}
                  </Typography>
                </>
              ) : (
                <>
                  {/* Groups */}
                  {nowPageProps.skills.value.map((skillGroup) => (
                    <Stack
                      key={skillGroup.name}
                      direction={"column"}
                      sx={{ mb: 2 }}
                    >
                      <Typography variant="h4" gutterBottom>
                        {skillGroup.name}
                      </Typography>
                      <Typography>{skillGroup.skills.join(", ")}</Typography>
                    </Stack>
                  ))}
                </>
              )}
            </Stack>
          </CardContent>
          <CardActions>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ width: "100%" }}
            >
              <Typography color={"primary"}>
                {nowPageProps !== nextPageProps ? (
                  <>
                    <Box component={"span"} display={"inline"} fontWeight={600}>
                      Next Page:
                    </Box>{" "}
                    {nextPageProps.title}
                  </>
                ) : (
                  <>
                    <Box component={"span"} display={"inline"} fontWeight={600}>
                      Prev Page:
                    </Box>{" "}
                    {prevPageProps.title}
                  </>
                )}
              </Typography>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <IconButton
                  color={"primary"}
                  onClick={turnPage("prev")}
                  disabled={prevPageProps === nowPageProps}
                >
                  <ExpandMoreOutlinedIcon />
                </IconButton>
                <IconButton
                  color={"primary"}
                  onClick={turnPage("next")}
                  disabled={nextPageProps === nowPageProps}
                >
                  <ExpandLessOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      </AnimatePresence>
    </Box>
  );
};

export default PortfolioSkillCard;
