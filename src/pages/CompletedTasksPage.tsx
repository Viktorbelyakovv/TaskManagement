import React, { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useTypedStore";
import { getCategoriesThunk } from "../store/categories/reducer";
import { getTasksThunk } from "../store/tasks/reducer";
import { getPaginationLimit } from "../store/tasks/selectors";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";
import useQueryParams from "../hooks/useQueryParams";

const CompletedTasksPage: FC = () => {
  const isCompletedTasks = true;
  const dispatch = useAppDispatch();
  const paginationLimit = useAppSelector(getPaginationLimit);
  const [startTask, setStartTask] = useState<number>(paginationLimit);

  const {
    queryParams,
    queryParams: { sortDate, sortName, categoryId },
    updateQueryParams,
    updateURLParams,
  } = useQueryParams();

  const onApply = () => {
    updateURLParams("");
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams,
        start: 0,
      })
    );
    setStartTask(paginationLimit);
  };

  const onResetSorting = () => {
    updateURLParams("resetSorting");
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams: { sortDate: false, sortName: false, categoryId },
        start: 0,
      })
    );
    setStartTask(paginationLimit);
  };

  const onResetFiltering = () => {
    updateURLParams("resetFiltering");
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams: { sortDate, sortName, categoryId: 0 },
        start: 0,
      })
    );
    setStartTask(paginationLimit);
  };

  useEffect(() => {
    dispatch(getCategoriesThunk(""));
  }, [dispatch]);

  return (
    <>
      <h1>COMPLETED TASKS</h1>
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
    </>
  );
};

export default CompletedTasksPage;
