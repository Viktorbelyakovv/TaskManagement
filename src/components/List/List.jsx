import React, { useEffect } from "react";
import Item from "../Item";
import { UploadList } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { selectList } from "../../store/tasks/selectors";
import { uploadListAction } from "../../store/tasks/reducer";
import "./List.css";

const List = () => {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
    UploadList().then((list) => dispatch(uploadListAction(list)));
  }, [dispatch]);

  return (
    <div className="List">
      {list && list.length ? (
        list.map((item) => <Item item={item} key={item.id} />)
      ) : (
        <h2>No tasks</h2>
      )}
    </div>
  );
};

export default List;
