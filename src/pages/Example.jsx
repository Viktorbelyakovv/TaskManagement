import React, { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Item from "../components/Item";
import Loader from "../components/Loader";
import { getTasksThunk } from "../store/tasks/reducer";
import { getTasks } from "../store/tasks/selectors";

const Example = () => {
  const newTasks = useSelector(getTasks);

  const dispatch = useDispatch();
  const paginationLimit = Number(process.env.REACT_APP_PAGINATION_LIMIT);
  const [length, setLength] = useState(paginationLimit);

  const [listTasks, setlistTasks] = useState({ items: newTasks });

  const fetchMoreData = () => {
    setLength((prevCount) => prevCount + paginationLimit);
    dispatch(
      getTasksThunk({
        isCompletedTasks: false,
        sortDate: false,
        sortName: false,
        filterCategory: false,
        start: length,
      })
    );

    setTimeout(() => {
      setlistTasks({ items: newTasks });
      console.log(listTasks.items);
    }, 1500);
  };

  useEffect(() => {
    if (listTasks.items === undefined) {
      setlistTasks({ items: newTasks });
    }
  }, [listTasks, newTasks]);

  if (listTasks.items === undefined) return <Loader />;

  return (
    <div>
      <InfiniteScroll
        dataLength={listTasks.items.length}
        next={fetchMoreData}
        hasMore={listTasks.items.length < 23}
        loader={<Loader />}
      >
        {listTasks.items.length &&
          listTasks.items.map((item) => (
            <Item
              item={item}
              key={item.id}
              payload={{
                isCompletedTasks: false,
                sortDate: false,
                sortName: false,
                filterCategory: false,
              }}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Example;
