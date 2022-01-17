import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/categories/selectors";
import { getCategoriesThunk } from "../store/categories/reducer";
import AddTaskForm from "../components/AddTaskForm";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering";

const MainPage = () => {
  const categoriesList = useSelector(getCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      {categoriesList.length && (
        <div>
          <AddTaskForm />
          <Filtering />
          <ListTasks isCompletedTasks={false} />
        </div>
      )}
    </>
  );
};

export default MainPage;
