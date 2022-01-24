import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getTasks,
  getTasksError,
  getTasksHasMore,
  getTasksLoading,
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
  start,
  end,
  setStartTask,
  getMoreTasks,
}) => {
  const firstLoading = useSelector(getTasksLoading);

  const error = useSelector(getTasksError);
  const hasMore = useSelector(getTasksHasMore);
  const newTasks = useSelector(getTasks);
  const [listTasks, setlistTasks] = useState({ items: newTasks });

  useEffect(() => {
    setlistTasks({ items: newTasks });
  }, [newTasks]);

  if (error) return <Error message={"Error downloading tasks"} />;

  if (firstLoading === "firstPending") return <Loader />;

  if (!newTasks.length) return <h2>No tasks</h2>;

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
                  start,
                  end,
                }}
                setStartTask={setStartTask}
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
  start: PropTypes.number,
  end: PropTypes.number,
  setStartTask: PropTypes.func,
  getMoreTasks: PropTypes.func,
};

export default ListTasks;
