import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import StyledAppBar from "./components/StyledAppBar";
import StyledTabs from "./components/StyledTabs";
import StyledTab from "./components/StyledTab";

const Navigation = () => {
  const location = useLocation();
  const [locationPathName, setPathName] = useState(location.pathname);

  const handleChange = (_, newValue) => {
    setPathName(newValue);
  };

  return (
    <StyledAppBar>
      <StyledTabs value={locationPathName} onChange={handleChange}>
        <StyledTab component={NavLink} to="/" label="Main Page" value="/" />
        <StyledTab
          component={NavLink}
          to="/CompletedTasksPage"
          label="Completed Tasks"
          value="/CompletedTasksPage"
        />
        <StyledTab
          component={NavLink}
          to="/SettingsPage"
          label="Settings"
          value="/SettingsPage"
        />
      </StyledTabs>
    </StyledAppBar>
  );
};

export default Navigation;
