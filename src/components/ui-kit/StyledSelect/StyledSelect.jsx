import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledSelect = styled(Select)(({ width }) => ({
  height: "56px",
  width: width,
  margin: "10px",
}));

export default StyledSelect;
