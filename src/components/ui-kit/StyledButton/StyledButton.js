import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
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

export default StyledButton;
