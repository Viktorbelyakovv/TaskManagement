import React, { FC, SyntheticEvent, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import StyledAppBar from "./components/StyledAppBar";
import StyledTabs from "./components/StyledTabs";
import StyledTab from "./components/StyledTab";
import { pages } from "./components/pages";

const Navigation: FC = () => {
  const location = useLocation();
  const locationIntercepted = pages.find(
    ({ value }) => value === location.pathname
  )
    ? location.pathname
    : false;
  const [locationPathName, setPathName] = useState(locationIntercepted);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setPathName(newValue);
  };

  return (
    <StyledAppBar>
      <StyledTabs value={locationPathName} onChange={handleChange}>
        {pages.map(({ id, ...other }) => (
          <StyledTab component={NavLink} key={id} {...other} />
        ))}
      </StyledTabs>
    </StyledAppBar>
  );
};

export default Navigation;
