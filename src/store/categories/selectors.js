export const selectCategories = ({ category }) => category.categories;

export const selectDefaultCategory = ({ category }) =>
  category.categories.find(({ isDefault }) => isDefault);
