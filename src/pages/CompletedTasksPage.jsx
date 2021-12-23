import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/List";

const CompletedTasksPage = () => {
  return (
    <Container>
      {"completed"}
      <Header />
      <List />
    </Container>
  );
};

export default CompletedTasksPage;
