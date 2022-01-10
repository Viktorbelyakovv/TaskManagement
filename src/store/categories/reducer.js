import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changeDefaultCategoryServer,
  getCategoriesServer,
} from "../../utils/apiCategories";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  getCategoriesServer
);

export const changeDefaultCategory = createAsyncThunk(
  "categories/changeDefaultCategory",
  ({ oldId, newId }) => changeDefaultCategoryServer({ oldId, newId })
);

export const slice = createSlice({
  name: "category",

  initialState: {
    categories: [],
  },

  reducers: {
    addCategoryAction: (state, { payload }) => {
      state.categories = state.categories.concat(payload);
    },

    deleteCategoryAction: (state, { payload }) => {
      state.categories = state.categories.filter(({ id }) => id !== payload);
    },

    changeCategoryTitleAction: (state, { payload: { id, title } }) => {
      const list = [...state.categories];
      const item = list.find((item) => item.id === id);
      item.title = title;
      state.categories = list;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(changeDefaultCategory.fulfilled, (state, { payload }) => {
      const list = [...state.categories];
      const defaultItem = list.find(({ isDefault }) => isDefault);
      defaultItem.isDefault = false;
      const newDefaultItem = list.find(({ id }) => id === payload[1].data.id);
      newDefaultItem.isDefault = true;
      state.categories = list;
    });
  },
});

export const {
  addCategoryAction,
  deleteCategoryAction,
  changeCategoryTitleAction,
} = slice.actions;

export default slice.reducer;
