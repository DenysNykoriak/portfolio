import { FC, forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Box, BoxProps, Link, IconButton, Collapse } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineContentProps,
  TimelineDot,
  TimelineDotProps,
  TimelineItem,
  TimelineItemProps,
  TimelineSeparator,
  TimelineOppositeContent,
  TimelineOppositeContentProps,
} from "@mui/lab";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SelfImprovementOutlinedIcon from "@mui/icons-material/SelfImprovementOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import PhpOutlinedIcon from "@mui/icons-material/PhpOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TypescriptIcon from "../../svgs/TypescriptIcon";
import { useUISize } from "../../hooks/common/useUISize";

type PortfolioTimelineProps = BoxProps;

type TLItemProps = {
  OppositeContentProps?: TimelineOppositeContentProps;
  ContentProps?: TimelineContentProps;
  DotProps?: TimelineDotProps;
  separator?: {
    hiddenStart?: boolean;
    hiddenEnd?: boolean;
    icon?: React.ReactElement;
  };
} & TimelineItemProps;

const TLItem = forwardRef<HTMLLIElement, TLItemProps>(
  (
    { OppositeContentProps, ContentProps, DotProps, separator, ...props },
    forwardedRef
  ) => {
    const [uiSize] = useUISize({ withoutLarge: true });

    return (
      <TimelineItem ref={forwardedRef} {...props}>
        <TimelineOppositeContent
          variant={uiSize === "medium" ? "h5" : "h6"}
          color="text.secondary"
          sx={{ m: "auto 0" }}
          {...OppositeContentProps}
        />
        <TimelineSeparator>
          <TimelineConnector
            sx={{
              height: "20px",
              backgroundColor: separator?.hiddenStart
                ? "rgba(0,0,0,0)"
                : undefined,
            }}
          />
          <TimelineDot {...DotProps}>{separator?.icon}</TimelineDot>
          <TimelineConnector
            sx={{
              height: "20px",
              backgroundColor: separator?.hiddenEnd
                ? "rgba(0,0,0,0)"
                : undefined,
            }}
          />
        </TimelineSeparator>
        <TimelineContent
          variant={uiSize === "medium" ? "body1" : "body2"}
          color="primary"
          sx={{ m: "auto 0" }}
          {...ContentProps}
        />
      </TimelineItem>
    );
  }
);

TLItem.displayName = "TimelineItem";

const PortfolioTimeline: FC<PortfolioTimelineProps> = ({ ...props }) => {
  const [timelineOpen, setTimelineOpen] = useState(false);

  const toggleTimelineOpen = () => {
    setTimelineOpen(!timelineOpen);
  };

  const [uiSize] = useUISize({ withoutLarge: true });

  return (
    <Box sx={{ width: uiSize === "medium" ? "65vw" : "95vw" }} {...props}>
      <motion.div
        initial={{
          opacity: 0,
          y: -200,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            duration: 2,
          },
        }}
        viewport={{ amount: 0.3, once: true }}
      >
        <Timeline position={"alternate"}>
          <TLItem
            separator={{
              hiddenStart: true,
              icon: <CakeOutlinedIcon fontSize={"large"} />,
            }}
            DotProps={{
              color: "primary",
            }}
            OppositeContentProps={{
              children: "August 2004",
            }}
            ContentProps={{
              children: "I was born in Transcarpathian region, Ukraine",
            }}
          />
          <TLItem
            separator={{
              icon: <TerminalOutlinedIcon fontSize={"large"} />,
            }}
            OppositeContentProps={{
              children: "May 2019",
            }}
            ContentProps={{
              children: "Became interested in programming (on Node JS)",
            }}
          />
          <Collapse in={timelineOpen}>
            <TLItem
              separator={{
                icon: <SmartToyOutlinedIcon fontSize={"large"} />,
              }}
              OppositeContentProps={{
                children: "June 2019",
              }}
              ContentProps={{
                children: "I wrote the first bot for Discord on Node JS",
              }}
            />
            <TLItem
              separator={{
                icon: <SelfImprovementOutlinedIcon fontSize={"large"} />,
              }}
              DotProps={{
                color: "primary",
              }}
              OppositeContentProps={{
                children: "Rest of 2019 and winter 2020",
              }}
              ContentProps={{
                children:
                  "I was improving my code writing skills, learned new topics etc.",
              }}
            />
            <TLItem
              separator={{
                icon: <BiotechOutlinedIcon fontSize={"large"} />,
              }}
              OppositeContentProps={{
                children: "Spring 2020",
              }}
              ContentProps={{
                children:
                  "I began to think about the technology with which I will work in the future",
              }}
            />
            <TLItem
              separator={{
                icon: <PhpOutlinedIcon fontSize={"large"} />,
              }}
              OppositeContentProps={{
                children: "Summer 2020",
              }}
              ContentProps={{
                children: "I was studying PHP and Laravel",
              }}
            />
            <TLItem
              separator={{
                icon: <PeopleAltOutlinedIcon fontSize={"large"} />,
              }}
              DotProps={{
                color: "primary",
              }}
              OppositeContentProps={{
                children: "August 2020 - January 2021",
              }}
              ContentProps={{
                children:
                  "I was developing custom plugin for gaming social network on Wordpress. And at the same time, I studied the Front-End because deep down I understood that PHP was not for me",
              }}
            />
            <TLItem
              separator={{
                icon: <CodeOutlinedIcon fontSize={"large"} />,
              }}
              OppositeContentProps={{
                children: "Fall 2020",
              }}
              ContentProps={{
                children: (
                  <>
                    I studied HTML/CSS, improved Javascript (following{" "}
                    <Link
                      href="https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/"
                      target={"_blank"}
                    >
                      Zero to Mastery
                    </Link>{" "}
                    courses), as I always wrote on Node JS before
                  </>
                ),
              }}
            />
            <TLItem
              separator={{
                icon: <TypescriptIcon fontSize="large" />,
              }}
              OppositeContentProps={{
                children: "Beginning of 2021",
              }}
              ContentProps={{
                children:
                  "I realized that the holes in typing in javascript are very disturbing, so I started studying typescript",
              }}
            />
            <TLItem
              separator={{
                icon: <SchoolOutlinedIcon fontSize={"large"} />,
              }}
              DotProps={{
                color: "primary",
              }}
              OppositeContentProps={{
                children: "Summer 2021",
              }}
              ContentProps={{
                children:
                  "Graduating from school and entering the university for computer science",
              }}
            />
            <TLItem
              separator={{
                icon: <StorefrontOutlinedIcon fontSize={"large"} />,
              }}
              OppositeContentProps={{
                children: "January 2022 - May 2022",
              }}
              ContentProps={{
                children:
                  "I created and developed my own trading bot for cryptocurrency marketplace Immutable X on Ethereum",
              }}
            />
          </Collapse>
          <TLItem
            separator={{
              icon: (
                <IconButton onClick={toggleTimelineOpen}>
                  {timelineOpen ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </IconButton>
              ),
            }}
            ContentProps={{
              children: (
                <Link
                  variant="h4"
                  onClick={toggleTimelineOpen}
                  underline={"none"}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {timelineOpen ? "Read less" : "Read more"}
                </Link>
              ),
            }}
          />
          <TLItem
            separator={{
              hiddenEnd: true,
              icon: <MoodOutlinedIcon fontSize={"large"} />,
            }}
            DotProps={{
              color: "primary",
            }}
            OppositeContentProps={{
              children: "Beginning of 2023 to present",
            }}
            ContentProps={{
              children:
                "I'm starting to look for a Front-End developer job, good luck for me)",
            }}
          />
        </Timeline>
      </motion.div>
    </Box>
  );
};

export default PortfolioTimeline;
