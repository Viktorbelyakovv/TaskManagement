import React from "react";
import List from "../components/List";

const CompletedTasksPage = () => {
  return (
    <>
      <h1>COMPLETED TASKS</h1>
      <List isCompletedTasks={true} />
    </>
  );
};

export default CompletedTasksPage;
