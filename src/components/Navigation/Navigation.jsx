import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();
  const [locationPathName, setPathName] = useState(location.pathname);
  const handleChange = (event, newValue) => {
    setPathName(newValue);
  };

  return (
    <AppBar
      position="fixed"
      className="AppBar"
      sx={{ bgcolor: "rgb(70, 70, 70)" }}
    >
      <Tabs className="Tab" value={locationPathName} onChange={handleChange}>
        <Tab
          component={NavLink}
          to="/"
          label="Main Page"
          value="/MainPage"
          sx={{ color: "rgb(250, 235, 96)" }}
        ></Tab>
        <Tab
          component={NavLink}
          to="/CompletedTasksPage"
          label="Completed Tasks"
          value="/CompletedTasksPage"
          sx={{ color: "rgb(250, 235, 96)" }}
        ></Tab>
      </Tabs>
    </AppBar>
  );
};

export default Navigation;
