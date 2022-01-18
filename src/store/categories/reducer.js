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
  async (rejectWithValue) => {
    try {
      return await getCategories().then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeDefaultCategoryThunk = createAsyncThunk(
  "categories/changeDefaultCategory",
  async ({ oldId, newId }, { rejectWithValue }) => {
    try {
      return await changeDefaultCategory({ oldId, newId }).then(
        ({ data }) => data
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategoryThunk = createAsyncThunk(
  "categories/addCategory",
  async ({ title, colorId, iconId }, { rejectWithValue }) => {
    try {
      return await addCategory({ title, colorId, iconId }).then(
        ({ data }) => data
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteCategory(id).then(() => id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeCategoryTitleThunk = createAsyncThunk(
  "categories/changeCategoryTitle",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      return await changeCategoryTitle({ id, title }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoriesReducer = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    loading: "idle",
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getCategoriesThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.categories = payload;
        if (state.loading === "pending") {
          state.loading = "idle";
        }
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(changeDefaultCategoryThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.categories.find(({ isDefault }) => isDefault).isDefault = false;
        state.categories.find(({ id }) => id === payload.id).isDefault = true;
      })
      .addCase(changeDefaultCategoryThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(addCategoryThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.categories.push(payload);
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(deleteCategoryThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.categories = state.categories.filter(({ id }) => id !== payload);
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(
        changeCategoryTitleThunk.fulfilled,
        (state, { payload: { title, id } }) => {
          state.error = null;
          state.categories.find((item) => item.id === id).title = title;
        }
      )
      .addCase(changeCategoryTitleThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default categoriesReducer.reducer;
