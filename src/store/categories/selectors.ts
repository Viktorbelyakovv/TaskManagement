import type { RootState } from "../../store";
import { CategoryItemType } from "../../types/types";

export const getCategories = (state: RootState): CategoryItemType[] =>
  state.categories.categories;

export const getDefaultCategory = (
  state: RootState
): CategoryItemType | undefined =>
  state.categories.categories.find(({ isDefault }) => isDefault);

export const getCategoriesLoading = (state: RootState): string =>
  state.categories.loading;

export const getCategoriesError = (state: RootState): string | null =>
  state.categories.error;
