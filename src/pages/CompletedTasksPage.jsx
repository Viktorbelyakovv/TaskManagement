import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../store/tasks/reducer";
import { getPaginationLimit } from "../store/tasks/selectors";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";
import useQueryParams from "../hooks/useQueryParams";

const CompletedTasksPage = () => {
  const isCompletedTasks = true;
  const dispatch = useDispatch();
  const start = 0;
  const end = useSelector(getPaginationLimit);
  const [startTask, setStartTask] = useState(end);

  const {
    sortDate,
    setSortDate,
    sortName,
    setSortName,
    filterCategory,
    setFilterCategory,
    setParams,
    resetParams,
  } = useQueryParams();

  const onApply = () => {
    setParams();
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
    setStartTask(end);
  };

  const onResetSorting = () => {
    resetParams(false, false, !!filterCategory);
    setSortDate(false);
    setSortName(false);
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate: false,
        sortName: false,
        filterCategory,
        start,
        end,
      })
    );
    setStartTask(end);
  };

  const onResetFiltering = () => {
    resetParams(sortDate, sortName, !!0);
    setFilterCategory(0);
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate,
        sortName,
        filterCategory: 0,
        start,
        end,
      })
    );
    setStartTask(end);
  };

  return (
    <>
      <h1>COMPLETED TASKS</h1>
      <Sorting
        sortDate={sortDate}
        setSortDate={setSortDate}
        sortName={sortName}
        setSortName={setSortName}
        onApplySorting={onApply}
        onResetSorting={onResetSorting}
      />
      <Filtering
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        onApplyFiltering={onApply}
        onResetFiltering={onResetFiltering}
      />
      <ListTasks
        isCompletedTasks={isCompletedTasks}
        sortDate={sortDate}
        sortName={sortName}
        filterCategory={filterCategory}
        start={start}
        end={end}
        startTask={startTask}
        setStartTask={setStartTask}
      />
    </>
  );
};

export default CompletedTasksPage;
