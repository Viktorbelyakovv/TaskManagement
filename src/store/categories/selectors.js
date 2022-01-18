export const getCategories = ({ categories }) => categories.categories;

export const getDefaultCategory = ({ categories }) =>
  categories.categories.find(({ isDefault }) => isDefault);

export const getCategoriesLoading = ({ categories }) => categories.loading;

export const getCategoriesError = ({ categories }) => categories.error;
