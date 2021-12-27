import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import StyledAppBar from "./components/StyledAppBar";
import StyledTabs from "./components/StyledTabs";
import StyledTab from "./components/StyledTab";

const Navigation = () => {
  const [value, setValue] = useState("Main");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledAppBar position="fixed">
      <StyledTabs value={value} onChange={handleChange}>
        <StyledTab
          component={NavLink}
          to="/"
          label="Main Page"
          value="Main"
        ></StyledTab>
        <StyledTab
          component={NavLink}
          to="/CompletedTasksPage"
          label="Completed Tasks"
          value="Completed Tasks"
        ></StyledTab>
        <StyledTab
          component={NavLink}
          to="/SettingsPage"
          label="Settings"
          value="Settings"
        ></StyledTab>
      </StyledTabs>
    </StyledAppBar>
  );
};

export default Navigation;
