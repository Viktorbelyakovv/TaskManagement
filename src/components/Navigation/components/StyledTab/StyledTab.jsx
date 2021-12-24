import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTab = styled(Tab)({
  color: "rgb(250, 235, 96)",
  "&.Mui-selected": {
    color: "rgb(241, 93, 93)",
  },
});

export default StyledTab;
