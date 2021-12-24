import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectList } from "../../store/tasks/selectors";
import {
  uploadListAction,
  deleteTaskAction,
  changeTitleAction,
  changeCompletedAction,
  changeFavoriteAction,
} from "../../store/tasks/reducer";
import {
  UploadList,
  DeleteTask,
  ChangeTitle,
  ChangeCompleted,
  ChangeFavorite,
} from "../../utils/api";
import Item from "../Item";
import "./List.css";

const List = () => {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    DeleteTask(id).then(({ status }) => {
      if (status === 200) {
        dispatch(deleteTaskAction(id));
      } else {
        alert("Error status = " + status);
      }
    });
  };

  const changeTitle = (id, title) => {
    ChangeTitle(id, title).then(({ status }) => {
      if (status === 200) {
        dispatch(changeTitleAction({ id, title }));
      } else {
        alert("Error status = " + status);
      }
    });
  };

  const changeCompleted = (id) => {
    const item = list.find((item) => item.id === id);

    if (item) {
      ChangeCompleted(id, !item.completed).then(({ status }) => {
        if (status === 200) {
          dispatch(changeCompletedAction(id));
        } else {
          alert("Error status = " + status);
        }
      });
    }
  };

  const changeFavorite = (id) => {
    const item = list.find((item) => item.id === id);

    if (item) {
      ChangeFavorite(id, !item.favorite).then(({ status }) => {
        if (status === 200) {
          dispatch(changeFavoriteAction(id));
          return true;
        } else {
          alert("Error status = " + status);
        }
      });
    }
  };

  useEffect(() => {
    UploadList().then((list) => dispatch(uploadListAction(list)));
  }, [dispatch]);

  return (
    <div className="List">
      {list && list.length ? (
        list.map((item) => (
          <Item
            item={item}
            deleteItem={deleteItem}
            changeTitle={changeTitle}
            changeCompleted={changeCompleted}
            changeFavorite={changeFavorite}
            key={item.id}
          />
        ))
      ) : (
        <h2>No tasks</h2>
      )}
    </div>
  );
};

export default List;
