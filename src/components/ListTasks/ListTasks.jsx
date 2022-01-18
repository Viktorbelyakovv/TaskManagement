import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getTasksThunk } from "../../store/tasks/reducer";
import { getTasks, getLoading, getError } from "../../store/tasks/selectors";
import Item from "../Item";
import Loader from "../Loader";
import Error from "../Error";
import "./ListTasks.css";

const ListTasks = ({ isCompletedTasks, sortDate, sortName }) => {
  const tasksList = useSelector(getTasks);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTasksThunk({ isCompletedTasks, sortDate: false, sortName: false })
    );
  }, [dispatch, isCompletedTasks]);

  return (
    <>
      {error ? (
        <Error message={"Error downloading tasks"} />
      ) : loading === "pending" ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

ListTasks.propTypes = {
  isCompletedTasks: PropTypes.bool,
  sortDate: PropTypes.bool,
  sortName: PropTypes.bool,
};

export default ListTasks;
