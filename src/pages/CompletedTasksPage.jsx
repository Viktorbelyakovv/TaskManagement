import React from "react";
import ListTasks from "../components/ListTasks";

const CompletedTasksPage = () => {
  return (
    <>
      <h1>COMPLETED TASKS</h1>
      <ListTasks isCompletedTasks={true} />
    </>
  );
};

export default CompletedTasksPage;
