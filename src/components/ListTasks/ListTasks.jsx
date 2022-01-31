/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../store/tasks/reducer";
import {
  getPaginationLimit,
  getTasks,
  getTasksError,
  getTasksHasMore,
  getTasksLoading,
} from "../../store/tasks/selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemTask from "../ItemTask";
import Loader from "../Loader";
import Error from "../Error";
import "./ListTasks.css";

const ListTasks = ({
  isCompletedTasks,
  queryParams,
  startTask,
  setStartTask,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(getTasksLoading);
  const error = useSelector(getTasksError);
  const hasMore = useSelector(getTasksHasMore);
  const listTasks = useSelector(getTasks);
  const paginationLimit = useSelector(getPaginationLimit);

  const getMoreTasks = () => {
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams,
        start: startTask,
      })
    );
    setStartTask((prevStart) => prevStart + paginationLimit);
  };

  useEffect(() => {
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams,
        start: 0,
      })
    );
  }, []);

  if (error) return <Error message={"Error downloading tasks"} />;

  if (!listTasks.length && loading === "pending") return <Loader />;

  if (!listTasks.length) return <h2>No tasks</h2>;

  return (
    <div className="ListTasks">
      {
        <InfiniteScroll
          dataLength={listTasks.length}
          next={getMoreTasks}
          hasMore={hasMore}
          loader={<Loader />}
        >
          {listTasks.length &&
            listTasks.map((item) => (
              <ItemTask
                item={item}
                key={item.id}
                payload={{
                  isCompletedTasks,
                  queryParams,
                  start: 0,
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
  queryParams: PropTypes.shape({
    sortDate: PropTypes.bool,
    sortName: PropTypes.bool,
    categoryId: PropTypes.number,
  }),
  startTask: PropTypes.number,
  setStartTask: PropTypes.func,
};

export default ListTasks;
