import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
import categoriesReducer from "./categories";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
});
