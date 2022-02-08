import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import "./Container.css";

const Container: FC = () => (
  <div className="Container">
    <Outlet />
  </div>
);

export default Container;
