export const getCategories = ({ categories }) => categories.categories;

export const getDefaultCategory = ({ categories }) =>
  categories.categories.find(({ isDefault }) => isDefault);
