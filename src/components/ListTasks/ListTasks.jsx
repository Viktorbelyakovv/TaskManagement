import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../store/tasks/reducer";
import {
  getTasks,
  getTasksError,
  getTasksHasMore,
} from "../../store/tasks/selectors";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const dispatch = useDispatch();

  const error = useSelector(getTasksError);
  const hasMore = useSelector(getTasksHasMore);
  const paginationLimit = Number(process.env.REACT_APP_PAGINATION_LIMIT);

  const [length, setLength] = useState(paginationLimit);
  const newTasks = useSelector(getTasks);
  const [listTasks, setlistTasks] = useState({ items: newTasks });

  const getMoreTasks = () => {
    setLength((prevCount) => prevCount + paginationLimit);
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate,
        sortName,
        filterCategory,
        start: length,
      })
    );
  };

  useEffect(() => {
    setlistTasks({ items: newTasks });
  }, [newTasks]);

  if (error) return <Error message={"Error downloading tasks"} />;

  if (!listTasks.items.length) return <h2>No tasks</h2>;

  return (
    <div className="ListTasks">
      {
        <InfiniteScroll
          dataLength={listTasks.items.length}
          next={getMoreTasks}
          hasMore={hasMore}
          loader={<Loader />}
        >
          {listTasks.items.length &&
            listTasks.items.map((item) => (
              <Item
                item={item}
                key={item.id}
                payload={{
                  isCompletedTasks,
                  sortDate,
                  sortName,
                  filterCategory,
                }}
              />
            ))}
        </InfiniteScroll>
      }
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
