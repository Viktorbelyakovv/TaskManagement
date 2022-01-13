import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getTasksAsync } from "../../store/tasks/reducer";
import { selectList } from "../../store/tasks/selectors";
import Item from "../Item";
import "./List.css";

const List = ({ isCompletedTasks }) => {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksAsync(isCompletedTasks));
  }, [dispatch, isCompletedTasks]);

  return (
    <div className="List">
      {list.length ? (
        list.map((item) => <Item item={item} key={item.id} />)
      ) : (
        <h2>No tasks</h2>
      )}
    </div>
  );
};

List.propTypes = {
  isCompletedTasks: PropTypes.bool,
};

export default List;
