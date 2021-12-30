import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "category",

  initialState: {
    categories: [],
    defaultCategory: { id: null },
  },

  reducers: {
    uploadCategoriesAction: (state, { payload }) => {
      state.categories = payload;
    },

    uploadDefaultCategoryAction: (state, { payload }) => {
      state.defaultCategory = payload;
    },

    changeDefaultCategoryAction: (state, { payload }) => {
      state.defaultCategory = payload;
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
});

export const {
  uploadCategoriesAction,
  uploadDefaultCategoryAction,
  changeDefaultCategoryAction,
  addCategoryAction,
  deleteCategoryAction,
  changeCategoryTitleAction,
} = slice.actions;

export default slice.reducer;
