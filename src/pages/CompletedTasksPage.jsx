import React from "react";
import Container from "../components/Container";
import List from "../components/List";

const CompletedTasksPage = () => {
  return (
    <Container>
      <h1>COMPLETED TASKS</h1>
      <List isCompletedTasks={true} />
    </Container>
  );
};

export default CompletedTasksPage;
