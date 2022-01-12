import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoriesServer,
  changeDefaultCategoryServer,
  addCategoryServer,
  deleteCategoryServer,
  changeCategoryTitleServer,
} from "../../utils/apiCategories";

export const getCategoriesAsync = createAsyncThunk(
  "categories/getCategoriesAsync",
  () => getCategoriesServer().then(({ data }) => data)
);

export const changeDefaultCategoryAsync = createAsyncThunk(
  "categories/changeDefaultCategoryAsync",
  ({ oldId, newId }) =>
    changeDefaultCategoryServer({ oldId, newId }).then((res) => res[1].data)
);

export const addCategoryAsync = createAsyncThunk(
  "categories/addCategoryAsync",
  ({ title, colorId, iconId }) =>
    addCategoryServer({ title, colorId, iconId }).then(({ data }) => data)
);

export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategoryAsync",
  (id) => deleteCategoryServer(id)
);

export const changeCategoryTitleAsync = createAsyncThunk(
  "categories/changeCategoryTitleAsync",
  ({ id, title }) =>
    changeCategoryTitleServer({ id, title }).then(({ data }) => data)
);

export const slice = createSlice({
  name: "category",

  initialState: {
    categories: [],
  },

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getCategoriesAsync.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });

    builder.addCase(
      changeDefaultCategoryAsync.fulfilled,
      (state, { payload }) => {
        state.categories.find(({ isDefault }) => isDefault).isDefault = false;
        state.categories.find(({ id }) => id === payload.id).isDefault = true;
      }
    );

    builder.addCase(addCategoryAsync.fulfilled, (state, { payload }) => {
      state.categories.push(payload);
    });

    builder.addCase(deleteCategoryAsync.fulfilled, (state, { payload }) => {
      state.categories = state.categories.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeCategoryTitleAsync.fulfilled,
      (state, { payload: { title, id } }) => {
        state.categories.find((item) => item.id === id).title = title;
      }
    );
  },
});

export default slice.reducer;
