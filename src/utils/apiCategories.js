import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getCategories = async () => {
  try {
    const response = await api.get(`/categories`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeDefaultCategory = async ({ oldId, newId }) => {
  try {
    const promise1 = api.patch(`/categories/${oldId}`, { isDefault: false });
    const promise2 = api.patch(`/categories/${newId}`, { isDefault: true });
    const response = await Promise.all([promise1, promise2]);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCategory = async ({ title, colorId, iconId }) => {
  try {
    const response = await api.post(`/categories`, {
      title,
      colorId,
      iconId,
      isDefault: false,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);

    return id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeCategoryTitle = async ({ id, title }) => {
  try {
    const response = await api.patch(`/categories/${id}`, { title });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
