import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavLinkProps } from "react-router-dom";

type StyledTabProps = {
  component: ForwardRefExoticComponent<
    NavLinkProps & RefAttributes<HTMLAnchorElement>
  >;
};

const StyledTab = styled(Tab)<StyledTabProps>(() => ({
  color: "rgb(250, 235, 96)",
  "&.Mui-selected": {
    color: "rgb(241, 93, 93)",
  },
}));

export default StyledTab;
