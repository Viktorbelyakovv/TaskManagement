import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "category",

  initialState: {
    categories: [
      { id: 1, title: "red food", colorId: 1, iconId: 2 },
      { id: 2, title: "blue shopping", colorId: 2, iconId: 3 },
      { id: 3, title: "green family", colorId: 3, iconId: 1 },
      { id: 4, title: "red sport", colorId: 1, iconId: 4 },
      { id: 5, title: "blue work", colorId: 2, iconId: 5 },
    ],
    colors: [
      { id: 1, title: "red" },
      { id: 2, title: "blue" },
      { id: 3, title: "green" },
    ],
    icons: [
      { id: 1, title: "Family" },
      { id: 2, title: "Food" },
      { id: 3, title: "Shopping" },
      { id: 4, title: "Sport" },
      { id: 5, title: "Work" },
    ],
    defaultCategory: { id: 3 },
  },

  reducers: {
    changeDefaultCategoryAction: (state, { payload }) => {
      state.defaultCategory.id = payload;
    },

    addCategoryAction: (state, { payload }) => {
      state.categories = state.categories.concat(payload);
    },
  },
});

export const { changeDefaultCategoryAction, addCategoryAction } = slice.actions;

export default slice.reducer;
