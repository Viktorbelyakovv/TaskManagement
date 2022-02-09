import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../store/categories/reducer";
import { getTasksThunk } from "../store/tasks/reducer";
import { getPaginationLimit } from "../store/tasks/selectors";
import AddTaskForm from "../components/AddTaskForm";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";
import useQueryParams from "../hooks/useQueryParams";

const MainPage: FC = () => {
  const isCompletedTasks = false;
  const dispatch = useDispatch();
  const paginationLimit = useSelector(getPaginationLimit);
  const [startTask, setStartTask] = useState(paginationLimit);

  const {
    queryParams,
    queryParams: { sortDate, sortName, categoryId },
    updateQueryParams,
    updateURLParams,
  } = useQueryParams();

  const onApply = () => {
    updateURLParams("");
    /* dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams,
        start: 0,
      })
    ); */
    setStartTask(paginationLimit);
  };

  const onResetSorting = () => {
    updateURLParams("resetSorting");
    /* dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams: { sortDate: false, sortName: false, categoryId },
        start: 0,
      })
    ); */
    setStartTask(paginationLimit);
  };

  const onResetFiltering = () => {
    updateURLParams("resetFiltering");
    /* dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams: { sortDate, sortName, categoryId: 0 },
        start: 0,
      })
    ); */
    setStartTask(paginationLimit);
  };

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      <div>
        <AddTaskForm
          isCompletedTasks={isCompletedTasks}
          queryParams={queryParams}
          setStartTask={setStartTask}
        />
        <Sorting
          queryParams={queryParams}
          updateQueryParams={updateQueryParams}
          onApplySorting={onApply}
          onResetSorting={onResetSorting}
        />
        <Filtering
          queryParams={queryParams}
          updateQueryParams={updateQueryParams}
          onApplyFiltering={onApply}
          onResetFiltering={onResetFiltering}
        />
        <ListTasks
          isCompletedTasks={isCompletedTasks}
          queryParams={queryParams}
          startTask={startTask}
          setStartTask={setStartTask}
        />
      </div>
    </>
  );
};

export default MainPage;
