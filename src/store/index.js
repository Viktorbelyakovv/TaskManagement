import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks";
import categoryReducer from "./categories";

export default configureStore({
  reducer: {
    list: taskReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
