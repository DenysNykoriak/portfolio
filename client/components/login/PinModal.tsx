import {
  ModalProps,
  Typography,
  Stack,
  FormHelperText,
  FormControl,
  Input,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useTheme } from "../../theme";
import { LoadingButton } from "@mui/lab";
import { usePrivateInfoContext } from "../../privateInfo";

type PinModalProps = Omit<ModalProps, "open" | "children">;

const PinModal: FC<PinModalProps> = ({ ...props }) => {
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();
  const { getPrivateInfo, modal } = usePrivateInfoContext();

  const updatePin = (e: ChangeEvent<HTMLInputElement>) =>
    setPin(e.target.value);

  const sendPin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await getPrivateInfo(pin);

    if (result.success) {
      modal.handleClose();
    } else {
      setErrorMsg(result.reason);
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={modal.open}
      onClose={modal.handleClose}
      PaperProps={{
        sx: { bgcolor: colors.nowTheme.bg.second, borderRadius: "15px" },
      }}
      data-testid="pin-dialog"
      {...props}
    >
      <DialogTitle component={"div"} align={"center"}>
        <Typography variant="h2" color={"primary"}>
          Pin Access
        </Typography>
        <Typography variant="h4">
          Please enter pin code to see my contact information
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Stack
          component={"form"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
          }}
        >
          <FormControl
            error={Boolean(errorMsg)}
            variant="standard"
            sx={{ mb: 2, width: "60%" }}
          >
            <InputLabel htmlFor="pin">Pin</InputLabel>
            <Input id="pin" onChange={updatePin} value={pin} />
            <FormHelperText id="pin">{errorMsg}</FormHelperText>
          </FormControl>
          <LoadingButton
            type={"submit"}
            loading={loading}
            variant="outlined"
            onClick={sendPin}
            sx={{
              width: "80%",
            }}
          >
            Get contact information
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PinModal;
