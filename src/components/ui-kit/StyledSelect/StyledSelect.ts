import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

interface StyledSelectProps {
  width: string;
}

const StyledSelect = styled(Select)<StyledSelectProps>(({ width }) => ({
  height: "56px",
  width: width,
  margin: "10px",
}));

export default StyledSelect;
