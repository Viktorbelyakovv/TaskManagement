import React from "react";
import { Outlet } from "react-router-dom";
import "./Container.css";

const Container = () => (
  <div className="Container">
    <Outlet />
  </div>
);

export default Container;
