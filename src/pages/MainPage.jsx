import React from "react";
import AddTaskForm from "../components/AddTaskForm";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";
import useTaskPageHook from "../hooks/useTaskPageHook";

const MainPage = () => {
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
  } = useTaskPageHook(false);

  return (
    <>
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      <div>
        <AddTaskForm
          isCompletedTasks={false}
          sortDate={sortDate}
          sortName={sortName}
          filterCategory={filterCategory}
        />
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
          isCompletedTasks={false}
          sortDate={sortDate}
          sortName={sortName}
          filterCategory={filterCategory}
        />
      </div>
    </>
  );
};

export default MainPage;
