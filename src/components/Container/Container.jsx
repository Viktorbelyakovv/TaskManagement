import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import "./Container.css";

const Container = ({ children }) => (
  <div className="Container">
    {children}
    <Outlet />
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default Container;
