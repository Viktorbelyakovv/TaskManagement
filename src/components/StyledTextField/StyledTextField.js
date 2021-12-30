import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
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
      borderColor: "rgb(250, 235, 96)",
      borderWidth: 2,
    },
  },
});

export default StyledTextField;
