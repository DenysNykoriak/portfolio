import { FC } from "react";
import {
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useTheme } from "../../theme";
import { usePrivateInfoContext } from "../../privateInfo";

export type DownloadResumeButtonProps = {
  TextProps?: TypographyProps;
} & ButtonProps<"a">;

const DownloadResumeButton: FC<DownloadResumeButtonProps> = ({
  TextProps,
  ...props
}) => {
  const { colors } = useTheme();

  const { privateInfo, modal: privateInfoModal } = usePrivateInfoContext();

  return (
    <Button
      variant={"contained"}
      component={"a"}
      {...(privateInfo
        ? { href: privateInfo.resume_path, download: true }
        : { onClick: privateInfoModal.handleOpen })}
      {...props}
    >
      <Typography
        variant={"body1"}
        sx={{
          color: colors.nowTheme.text,
        }}
        {...TextProps}
      >
        Get Resume
      </Typography>
    </Button>
  );
};

export default DownloadResumeButton;
