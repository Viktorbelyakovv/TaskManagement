import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)({
  height: "50px",
  width: "60%",
  margin: "10px",

  "& label.Mui-focused": {
    color: "rgb(130, 50, 50)",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: 2,
    },

    "&:hover fieldset": {
      borderColor: "rgb(250, 235, 96)",
      borderWidth: 2,
    },

    "&.Mui-focused fieldset": {
      borderColor: "rgb(241, 93, 93)",
      borderWidth: 2,
    },
  },
});

export const StyledSelect = styled(TextField)({
  height: "50px",
  width: "10%",
  margin: "10px",
});

export const StyledButton = styled(Button)({
  height: "55px",
  width: "10%",
  margin: "10px",
  color: "black",
  borderColor: "black",
  borderWidth: 2,

  "&:active": {
    backgroundColor: "rgb(241, 93, 93)",
    borderColor: "rgb(241, 93, 93)",
    borderWidth: 2,
  },

  "&:hover": {
    borderColor: "rgb(250, 235, 96)",
    borderWidth: 2,
  },
});