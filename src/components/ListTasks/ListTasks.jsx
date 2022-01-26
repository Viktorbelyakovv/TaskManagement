import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../store/tasks/reducer";
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
  startTask,
  setStartTask,
}) => {
  const loading = useSelector(getTasksLoading);
  const error = useSelector(getTasksError);
  const hasMore = useSelector(getTasksHasMore);
  const listTasks = useSelector(getTasks);
  const dispatch = useDispatch();

  const getMoreTasks = () => {
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate,
        sortName,
        filterCategory,
        start: startTask,
        end: startTask + end,
      })
    );
    setStartTask((prevStart) => prevStart + end);
  };

  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (/* !listTasks.length */ first) {
      {
        setFirst(false);
        dispatch(
          getTasksThunk({
            isCompletedTasks,
            sortDate,
            sortName,
            filterCategory,
            start,
            end,
          })
        );
      }
    }
  }, [
    dispatch,
    isCompletedTasks,
    sortDate,
    sortName,
    filterCategory,
    start,
    end,
    first,
    /* listTasks.length, */
  ]);

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
  startTask: PropTypes.number,
  setStartTask: PropTypes.func,
};

export default ListTasks;
