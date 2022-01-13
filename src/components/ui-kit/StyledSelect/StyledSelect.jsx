import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledSelect = styled(Select)(({ width }) => ({
  height: "56px",
  width: width,
  margin: "10px",

  /* "&.MuiSelect-outlined": {
    borderColor: "rgb(250, 235, 96)",
    borderWidth: 5,
  }, */
}));

export default StyledSelect;
