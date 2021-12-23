import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";
import "./Navigation.css";

const Navigation = () => {
  return (
    <AppBar
      position="static"
      className="AppBar"
      sx={{ bgcolor: "rgb(70, 70, 70)" }}
    >
      <Tabs className="Tab">
        <Tab
          component={NavLink}
          activeClassName="active"
          to="/"
          label="Main Page"
          sx={{ color: "rgb(250, 235, 96)" }}
        ></Tab>
        <Tab
          component={NavLink}
          activeClassName="active"
          to="/CompletedTaskPage"
          label="Completed Tasks"
          sx={{ color: "rgb(250, 235, 96)" }}
        ></Tab>
      </Tabs>
    </AppBar>
  );
};

export default Navigation;
