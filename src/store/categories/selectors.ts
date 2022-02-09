import type { RootState } from "../../store";

export const getCategories = (state: RootState) => state.categories.categories;

export const getDefaultCategory = (state: RootState) =>
  state.categories.categories.find(({ isDefault }) => isDefault);

export const getCategoriesLoading = (state: RootState) =>
  state.categories.loading;

export const getCategoriesError = (state: RootState) => state.categories.error;
