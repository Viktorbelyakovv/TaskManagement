import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

interface StyledTextFieldProps {
  width: string;
  error: boolean;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>(
  ({ width, error }) => ({
    height: "50px",
    width: width,
    margin: "10px",

    "& label.Mui-focused": {
      color: "rgb(130, 50, 50)",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        borderWidth: 2,
      },

      "&.Mui-focused fieldset": {
        borderColor: !error && "rgb(250, 235, 96)",
        borderWidth: 2,
      },
    },
  })
);

export default StyledTextField;
