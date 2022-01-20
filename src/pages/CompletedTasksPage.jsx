import React from "react";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";
import useTaskPageHook from "../hooks/useTaskPageHook";

const CompletedTasksPage = () => {
  const {
    sortDate,
    setSortDate,
    sortName,
    setSortName,
    filterCategory,
    setFilterCategory,
    onApply,
    onResetSorting,
    onResetFiltering,
  } = useTaskPageHook(true);

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
        isCompletedTasks={true}
        sortDate={sortDate}
        sortName={sortName}
        filterCategory={filterCategory}
      />
    </>
  );
};

export default CompletedTasksPage;
