export const selectCategories = ({ categories }) => categories.categories;

export const selectDefaultCategory = ({ categories }) =>
  categories.categories.find(({ isDefault }) => isDefault);
