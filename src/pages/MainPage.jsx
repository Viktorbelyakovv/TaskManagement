import React from "react";
import AddTaskForm from "../components/AddTaskForm";
import ListTasks from "../components/ListTasks";

const MainPage = () => (
  <>
    <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
    <AddTaskForm />
    <ListTasks isCompletedTasks={false} />
  </>
);

export default MainPage;
