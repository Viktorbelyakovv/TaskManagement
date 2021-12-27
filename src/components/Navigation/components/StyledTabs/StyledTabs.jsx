import { Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTabs = styled(Tabs)({
  padding: "10px",
  "& .MuiTabs-indicator": {
    backgroundColor: "rgb(241, 93, 93)",
  },
});

export default StyledTabs;
