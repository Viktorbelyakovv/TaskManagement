import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getError } from "../../store/tasks/selectors";
import "./Error.css";

const Error = ({ message }) => {
  const error = useSelector(getError);
  return (
    <div className="Error">
      <h1>{error ? message : ""} </h1>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
