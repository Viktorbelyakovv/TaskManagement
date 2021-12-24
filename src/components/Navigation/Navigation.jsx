import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import StyledAppBar from "./components/StyledAppBar";
import StyledTabs from "./components/StyledTabs";
import StyledTab from "./components/StyledTab";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const [locationPathName, setPathName] = useState(location.pathname);
  const handleChange = (event, newValue) => {
    setPathName(newValue);
  };

  return (
    <StyledAppBar position="fixed" className="AppBar">
      <StyledTabs
        className="Tab"
        value={locationPathName}
        onChange={handleChange}
      >
        <StyledTab
          component={NavLink}
          to="/"
          label="Main Page"
          value="/"
        ></StyledTab>
        <StyledTab
          component={NavLink}
          to="/CompletedTasksPage"
          label="Completed Tasks"
          value="/CompletedTasksPage"
        ></StyledTab>
      </StyledTabs>
    </StyledAppBar>
  );
};

export default Navigation;
