import { StackProps, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { usePrivateInfoContext } from "../../privateInfo";
import { useTheme } from "../../theme";

type PortfolioFooterProps = StackProps<"footer">;

const PortfolioFooter: FC<PortfolioFooterProps> = ({ ...props }) => {
  const { colors } = useTheme();
  const { privateInfo, modal: privateInfoModal } = usePrivateInfoContext();

  return (
    <Stack
      component={"footer"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      sx={{
        width: "100%",
        height: "8vh",
        px: 2,
        bgcolor: colors.nowTheme.bg.second,
      }}
      {...props}
    >
      <Typography
        variant="body2"
        sx={{
          color: colors.nowTheme.text,
        }}
      >
        Author: Denys Nykoriak
      </Typography>
      <Link
        variant="body2"
        underline="none"
        {...(privateInfo
          ? { href: privateInfo.resume_path, download: true }
          : { onClick: privateInfoModal.handleOpen })}
        sx={{
          color: "primary",
          cursor: "pointer",
        }}
      >
        Download Resume
      </Link>
      <Link
        variant="body2"
        underline="none"
        href={"https://github.com/DenysNykoriak/portfolio"}
        target={"_blank"}
      >
        View code
      </Link>
    </Stack>
  );
};

export default PortfolioFooter;
