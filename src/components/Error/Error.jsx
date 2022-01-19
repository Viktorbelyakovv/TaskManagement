import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getTasksError } from "../../store/tasks/selectors";
import { getCategoriesError } from "../../store/categories/selectors";
import "./Error.css";

const Error = ({ message }) => {
  const errorTasks = useSelector(getTasksError);
  const errorCategories = useSelector(getCategoriesError);

  return (
    <div className="Error">
      <h1>{errorTasks || errorCategories ? message : ""} </h1>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
