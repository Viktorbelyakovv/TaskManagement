import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(TextField)({
  height: "50px",
  width: "70%",
  margin: "10px 10px 0",

  "&.MuiTextField-root .Mui-focused": {
    fontStyle: "italic",
  },
});

export default StyledListItem;
