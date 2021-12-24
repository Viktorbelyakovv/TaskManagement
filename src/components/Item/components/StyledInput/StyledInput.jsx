import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";

const StyledInput = styled(Input)({
  height: "50px",
  width: "75%",
  margin: "10px",

  "&.Mui-focused": {
    fontStyle: "italic",
  },
});

export default StyledInput;
