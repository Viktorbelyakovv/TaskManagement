import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  uploadCategoriesAction,
  uploadDefaultCategoryAction,
} from "../../store/categories/reducer";
import {
  uploadCategoriesServer,
  uploadDefaultCategoryServer,
} from "../../utils/apiCategories";
import Navigation from "../Navigation/Navigation";
import MainPage from "../../pages/MainPage";
import CompletedTasksPage from "../../pages/CompletedTasksPage";
import SettingsPage from "../../pages/SettingsPage";
import NotFound from "../../pages/NotFound";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    uploadDefaultCategoryServer().then(
      (data) => data && dispatch(uploadDefaultCategoryAction(data))
    );

    uploadCategoriesServer().then(
      (data) => data && dispatch(uploadCategoriesAction(data))
    );
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="CompletedTasksPage" element={<CompletedTasksPage />} />
          <Route path="SettingsPage" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
