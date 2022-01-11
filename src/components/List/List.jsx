import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCompletedList,
  selectNotCompletedList,
} from "../../store/tasks/selectors";
import {
  getList,
  deleteTask,
  changeTitle,
  changeCompleted,
  changeFavorite,
} from "../../store/tasks/reducer";
import Item from "../Item";
import "./List.css";

const List = ({ isCompletedTasks }) => {
  const list = useSelector(
    isCompletedTasks ? selectCompletedList : selectNotCompletedList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  const onDeleteItem = (id) => {
    dispatch(deleteTask(id));
  };

  const onChangeTitle = (id, title) => {
    dispatch(changeTitle({ id, title }));
  };

  const onChangeCompleted = (id, isCompleted, isFavorite) => {
    dispatch(changeCompleted({ id, isCompleted: !isCompleted }));
    if (isFavorite) {
      dispatch(changeFavorite({ id, isFavorite: !isFavorite }));
    }
  };

  const onChangeFavorite = (id, isFavorite) => {
    dispatch(changeFavorite({ id, isFavorite: !isFavorite }));
  };

  return (
    <div className="List">
      {list.length ? (
        list.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onChangeTitle={onChangeTitle}
            onChangeCompleted={onChangeCompleted}
            onChangeFavorite={onChangeFavorite}
            key={item.id}
          />
        ))
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
