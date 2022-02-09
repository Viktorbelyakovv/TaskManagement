import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryItemType } from "../../types/types";
import {
  getCategories,
  changeDefaultCategory,
  addCategory,
  deleteCategory,
  changeCategoryTitle,
} from "../../utils/apiCategories";

export const getCategoriesThunk = createAsyncThunk(
  "categories/getCategories",
  async ({ rejectWithValue }: any) => {
    try {
      return await getCategories().then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeDefaultCategoryThunk = createAsyncThunk(
  "categories/changeDefaultCategory",
  async (
    { oldId, newId }: { oldId: number; newId: number },
    { rejectWithValue }
  ) => {
    try {
      return await changeDefaultCategory({ oldId, newId }).then(
        ({ data }) => data
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCategoryThunk = createAsyncThunk(
  "categories/addCategory",
  async (
    {
      title,
      colorId,
      iconId,
    }: { title: string; colorId: number; iconId: number },
    { rejectWithValue }
  ) => {
    try {
      return await addCategory({ title, colorId, iconId }).then(
        ({ data }) => data
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      return await deleteCategory(id).then(() => id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeCategoryTitleThunk = createAsyncThunk(
  "categories/changeCategoryTitle",
  async ({ id, title }: { id: number; title: string }, { rejectWithValue }) => {
    try {
      return await changeCategoryTitle({ id, title }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface CategoriesState {
  categories: Array<CategoryItemType>;
  loading: string;
  error: boolean | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: "idle",
  error: null,
};

export const categoriesReducer = createSlice({
  name: "categories",

  initialState,

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
      .addCase(getCategoriesThunk.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(changeDefaultCategoryThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        const oldDefaultCategory = state.categories.find(
          ({ isDefault }) => isDefault
        );
        if (oldDefaultCategory) oldDefaultCategory.isDefault = false;
        const newDefaultCategory = state.categories.find(
          ({ id }) => id === payload.id
        );
        if (newDefaultCategory) newDefaultCategory.isDefault = true;
      })
      .addCase(changeDefaultCategoryThunk.rejected, (state, action: any) => {
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
      .addCase(addCategoryThunk.rejected, (state, action: any) => {
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
      .addCase(deleteCategoryThunk.rejected, (state, action: any) => {
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
          const category = state.categories.find((item) => item.id === id);
          if (category) category.title = title;
        }
      )
      .addCase(changeCategoryTitleThunk.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default categoriesReducer.reducer;
