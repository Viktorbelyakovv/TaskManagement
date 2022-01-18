import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk } from "../../store/tasks/reducer";
import { getTasks } from "../../store/tasks/selectors";
import Item from "../Item";
import "./ListTasks.css";

const ListTasks = ({ isCompletedTasks, sortDate, sortName }) => {
  const tasksList = useSelector(getTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTasksThunk({ isCompletedTasks, sortDate: false, sortName: false })
    );
  }, [dispatch, isCompletedTasks]);

  return (
    <div className="ListTasks">
      {tasksList.length ? (
        tasksList.map((item) => (
          <Item
            item={item}
            key={item.id}
            payload={{ isCompletedTasks, sortDate, sortName }}
          />
        ))
      ) : (
        <h2>No tasks</h2>
      )}
    </div>
  );
};

ListTasks.propTypes = {
  isCompletedTasks: PropTypes.bool,
  sortDate: PropTypes.bool,
  sortName: PropTypes.bool,
};

export default ListTasks;
