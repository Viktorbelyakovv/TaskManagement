import React from "react";
import Container from "../components/Container";
import AddTaskForm from "../components/AddTaskForm";
import List from "../components/List";

const MainPage = () => (
  <Container>
    <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
    <AddTaskForm />
    <List isCompleted={false} />
  </Container>
);

export default MainPage;
