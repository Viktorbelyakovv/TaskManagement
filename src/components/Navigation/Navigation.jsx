import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@mui/material";
import "./Navigation.css";

const Navigation = () => {
  return (
    <AppBar position="static" className="AppBar">
      <Tabs>
        <Tab
          component={NavLink}
          activeClassName="active"
          to="/"
          label="Main Page"
        ></Tab>
        <Tab
          component={NavLink}
          activeClassName="active"
          to="/CompletedTaskPage"
          label="Completed Tasks"
        ></Tab>
      </Tabs>
    </AppBar>
  );
};

export default Navigation;
