import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryItemType } from "../../types/types";
import {
  getCategories,
  changeDefaultCategory,
  addCategory,
  deleteCategory,
  changeCategoryTitle,
} from "../../utils/apiCategories";

type MyError = {
  errorMessage: string;
};

type ChangeDefaultCategoryParams = {
  oldId: number;
  newId: number;
};

type AddCategoryParams = {
  title: string;
  colorId: number;
  iconId: number;
};

type ChangeCategoryTitleParams = {
  id: number;
  title: string;
};

export const getCategoriesThunk = createAsyncThunk<
  CategoryItemType[],
  undefined,
  {
    rejectValue: MyError;
  }
>("categories/getCategories", async (_, { rejectWithValue }) => {
  try {
    return await getCategories().then(({ data }) => data);
  } catch (error) {
    return rejectWithValue(error as MyError);
  }
});

export const changeDefaultCategoryThunk = createAsyncThunk<
  CategoryItemType,
  ChangeDefaultCategoryParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/changeDefaultCategory",
  async ({ oldId, newId }, { rejectWithValue }) => {
    try {
      return await changeDefaultCategory({ oldId, newId }).then(
        ({ data }) => data
      );
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

export const addCategoryThunk = createAsyncThunk<
  CategoryItemType,
  AddCategoryParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/addCategory",
  async ({ title, colorId, iconId }, { rejectWithValue }) => {
    try {
      return await addCategory({ title, colorId, iconId }).then(
        ({ data }) => data
      );
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk<
  number,
  number,
  {
    rejectValue: MyError;
  }
>("categories/deleteCategory", async (id, { rejectWithValue }) => {
  try {
    return await deleteCategory(id).then(() => id);
  } catch (error) {
    return rejectWithValue(error as MyError);
  }
});

export const changeCategoryTitleThunk = createAsyncThunk<
  CategoryItemType,
  ChangeCategoryTitleParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/changeCategoryTitle",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      return await changeCategoryTitle({ id, title }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

type CategoriesState = {
  categories: Array<CategoryItemType>;
  loading: string;
  error: string | null;
};

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
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
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
      .addCase(changeDefaultCategoryThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
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
          state.error = action.error.message as string;
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
          state.error = action.error.message as string;
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
      .addCase(changeCategoryTitleThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
        }
      });
  },
});

export default categoriesReducer.reducer;
