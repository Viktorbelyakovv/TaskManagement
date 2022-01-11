import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import { getCategoriesAsync } from "../store/categories/reducer";
import Container from "../components/Container";
import DefaultCategory from "../components/Settings/DefaultCategory";
import AddCategoryForm from "../components/Settings/AddCategoryForm";
import ListCategories from "../components/Settings/ListCategories";

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  const categoriesList = useSelector(selectCategories);

  return (
    <Container>
      <h1>SETTINGS</h1>
      {categoriesList.length && (
        <div>
          <DefaultCategory />
          <AddCategoryForm />
          <ListCategories />
        </div>
      )}
    </Container>
  );
};

export default SettingsPage;
