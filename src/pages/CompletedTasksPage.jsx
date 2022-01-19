import React, { useState } from "react";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";

const CompletedTasksPage = () => {
  const [sortDate, setSortDate] = useState(false);
  const [sortName, setSortName] = useState(false);
  return (
    <>
      <h1>COMPLETED TASKS</h1>
      <Sorting
        isCompletedTasks={true}
        sortDate={sortDate}
        setSortDate={setSortDate}
        sortName={sortName}
        setSortName={setSortName}
      />
      <ListTasks isCompletedTasks={true} />
    </>
  );
};

export default CompletedTasksPage;
