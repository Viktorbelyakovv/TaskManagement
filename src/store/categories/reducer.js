import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  changeDefaultCategory,
  addCategory,
  deleteCategory,
  changeCategoryTitle,
} from "../../utils/apiCategories";

export const getCategoriesThunk = createAsyncThunk(
  "categories/getCategories",
  () => getCategories().then(({ data }) => data)
);

export const changeDefaultCategoryThunk = createAsyncThunk(
  "categories/changeDefaultCategory",
  ({ oldId, newId }) =>
    changeDefaultCategory({ oldId, newId }).then((res) => res[1].data)
);

export const addCategoryThunk = createAsyncThunk(
  "categories/addCategory",
  ({ title, colorId, iconId }) =>
    addCategory({ title, colorId, iconId }).then(({ data }) => data)
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/deleteCategory",
  (id) => deleteCategory(id)
);

export const changeCategoryTitleThunk = createAsyncThunk(
  "categories/changeCategoryTitle",
  ({ id, title }) => changeCategoryTitle({ id, title }).then(({ data }) => data)
);

export const categoriesReducer = createSlice({
  name: "categories",

  initialState: {
    categories: [],
  },

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });

    builder.addCase(
      changeDefaultCategoryThunk.fulfilled,
      (state, { payload }) => {
        state.categories.find(({ isDefault }) => isDefault).isDefault = false;
        state.categories.find(({ id }) => id === payload.id).isDefault = true;
      }
    );

    builder.addCase(addCategoryThunk.fulfilled, (state, { payload }) => {
      state.categories.push(payload);
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, { payload }) => {
      state.categories = state.categories.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeCategoryTitleThunk.fulfilled,
      (state, { payload: { title, id } }) => {
        state.categories.find((item) => item.id === id).title = title;
      }
    );
  },
});

export default categoriesReducer.reducer;
