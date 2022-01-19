import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesThunk } from "../store/categories/reducer";
import AddTaskForm from "../components/AddTaskForm";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";

const MainPage = () => {
  const [sortDate, setSortDate] = useState(false);
  const [sortName, setSortName] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      <div>
        <AddTaskForm
          isCompletedTasks={false}
          sortDate={sortDate}
          sortName={sortName}
        />
        <Sorting
          isCompletedTasks={false}
          sortDate={sortDate}
          setSortDate={setSortDate}
          sortName={sortName}
          setSortName={setSortName}
        />
        <ListTasks
          isCompletedTasks={false}
          sortDate={sortDate}
          sortName={sortName}
        />
      </div>
    </>
  );
};

export default MainPage;
