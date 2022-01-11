import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCompletedList,
  selectNotCompletedList,
} from "../../store/tasks/selectors";
import { getListAsync } from "../../store/tasks/reducer";
import Item from "../Item";
import "./List.css";

const List = ({ isCompletedTasks }) => {
  const list = useSelector(
    isCompletedTasks ? selectCompletedList : selectNotCompletedList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAsync());
  }, [dispatch]);

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
