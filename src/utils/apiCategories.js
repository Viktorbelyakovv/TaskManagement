import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getCategoriesServer = async () => {
  try {
    const { data } = await api.get(`/categories`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeDefaultCategoryServer = async ({ oldId, newId }) => {
  try {
    const promise1 = api.patch(`/categories/${oldId}`, { isDefault: false });
    const promise2 = api.patch(`/categories/${newId}`, { isDefault: true });
    const response = await Promise.all([promise1, promise2]);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCategoryServer = async (title, colorId, iconId) => {
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

export const deleteCategoryServer = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeCategoryTitleServer = async (id, title) => {
  try {
    const response = await api.patch(`/categories/${id}`, { title });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
