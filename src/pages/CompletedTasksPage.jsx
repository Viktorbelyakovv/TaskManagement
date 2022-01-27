import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk } from "../store/categories/reducer";
import { getTasksThunk } from "../store/tasks/reducer";
import { getPaginationLimit } from "../store/tasks/selectors";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";
import useQueryParams, {
  updateCategoryIdAC,
  updateSortDateAC,
  updateSortNameAC,
} from "../hooks/useQueryParams";

const CompletedTasksPage = () => {
  const isCompletedTasks = true;
  const dispatch = useDispatch();
  const start = 0;
  const paginationLimit = useSelector(getPaginationLimit);
  const [startTask, setStartTask] = useState(paginationLimit);

  const {
    queryParams,
    queryParams: { sortDate, sortName, categoryId },
    updateQueryParams,
    setParams,
    resetParams,
  } = useQueryParams();

  const onApply = () => {
    setParams();
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams,
        start,
      })
    );
    setStartTask(paginationLimit);
  };

  const onResetSorting = () => {
    resetParams(false, false, !!categoryId);
    updateQueryParams(updateSortDateAC(false));
    updateQueryParams(updateSortNameAC(false));
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams: { sortDate: false, sortName: false, categoryId },
        start,
      })
    );
    setStartTask(paginationLimit);
  };

  const onResetFiltering = () => {
    resetParams(sortDate, sortName, !!0);
    updateQueryParams(updateCategoryIdAC(0));
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        queryParams: { sortDate, sortName, categoryId: 0 },
        start,
      })
    );
    setStartTask(paginationLimit);
  };

  useEffect(() => {
    dispatch(getCategoriesThunk());
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
        start={start}
        startTask={startTask}
        setStartTask={setStartTask}
      />
    </>
  );
};

export default CompletedTasksPage;
