import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const StyledCheckbox = styled(Checkbox)({
  color: "black",

  "&.Mui-checked": {
    color: "black",
  },
});

export default StyledCheckbox;
