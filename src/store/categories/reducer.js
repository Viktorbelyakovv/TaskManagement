import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesServer } from "../../utils/apiCategories";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  getCategoriesServer
);

export const slice = createSlice({
  name: "category",

  initialState: {
    categories: [],
  },

  reducers: {
    changeDefaultCategoryAction: (state, { payload }) => {
      const list = [...state.categories];
      const defaultItem = list.find(({ isDefault }) => isDefault);
      defaultItem.isDefault = false;
      const newDefaultItem = list.find(({ id }) => id === payload);
      newDefaultItem.isDefault = true;
      state.categories = list;
    },

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
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  changeDefaultCategoryAction,
  addCategoryAction,
  deleteCategoryAction,
  changeCategoryTitleAction,
} = slice.actions;

export default slice.reducer;
