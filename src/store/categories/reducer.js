import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoriesServer,
  changeDefaultCategoryServer,
  addCategoryServer,
  deleteCategoryServer,
  changeCategoryTitleServer,
} from "../../utils/apiCategories";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  getCategoriesServer
);

export const changeDefaultCategory = createAsyncThunk(
  "categories/changeDefaultCategory",
  ({ oldId, newId }) => changeDefaultCategoryServer({ oldId, newId })
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  ({ title, colorId, iconId }) => addCategoryServer({ title, colorId, iconId })
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  (id) => deleteCategoryServer(id)
);

export const changeCategoryTitle = createAsyncThunk(
  "categories/changeCategoryTitle",
  ({ id, title }) => changeCategoryTitleServer({ id, title })
);

export const slice = createSlice({
  name: "category",

  initialState: {
    categories: [],
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategories.fulfilled, (state, { payload: { data } }) => {
      state.categories = data;
    });

    builder.addCase(changeDefaultCategory.fulfilled, (state, { payload }) => {
      const list = [...state.categories];
      const defaultItem = list.find(({ isDefault }) => isDefault);
      defaultItem.isDefault = false;
      const newDefaultItem = list.find(({ id }) => id === payload[1].data.id);
      newDefaultItem.isDefault = true;
      state.categories = list;
    });

    builder.addCase(addCategory.fulfilled, (state, { payload: { data } }) => {
      state.categories = state.categories.concat(data);
    });

    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.categories = state.categories.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeCategoryTitle.fulfilled,
      (
        state,
        {
          payload: {
            data: { id, title },
          },
        }
      ) => {
        const list = [...state.categories];
        const item = list.find((item) => item.id === id);
        item.title = title;
        state.categories = list;
      }
    );
  },
});

export default slice.reducer;
