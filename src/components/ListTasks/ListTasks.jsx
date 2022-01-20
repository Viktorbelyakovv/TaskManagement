import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getTasks,
  getTasksLoading,
  getTasksError,
} from "../../store/tasks/selectors";
import Item from "../Item";
import Loader from "../Loader";
import Error from "../Error";
import "./ListTasks.css";

const ListTasks = ({
  isCompletedTasks,
  sortDate,
  sortName,
  filterCategory,
}) => {
  const tasksList = useSelector(getTasks);
  const loading = useSelector(getTasksLoading);
  const error = useSelector(getTasksError);

  if (error) return <Error message={"Error downloading tasks"} />;

  if (loading === "pending") return <Loader />;

  if (!tasksList.length) return <h2>No tasks</h2>;

  return (
    <div className="ListTasks">
      {tasksList.map((item) => (
        <Item
          item={item}
          key={item.id}
          payload={{ isCompletedTasks, sortDate, sortName, filterCategory }}
        />
      ))}
    </div>
  );
};

ListTasks.propTypes = {
  isCompletedTasks: PropTypes.bool,
  sortDate: PropTypes.bool,
  sortName: PropTypes.bool,
  filterCategory: PropTypes.number,
};

export default ListTasks;
