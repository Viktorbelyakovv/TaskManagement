import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const uploadCategoriesServer = () => {
  return api
    .get(`/categories`)
    .then(({ data }) => data)
    .catch((error) => alert(error));
};

export const uploadColorsServer = () => {
  return api
    .get(`/colors`)
    .then(({ data }) => data)
    .catch((error) => alert(error));
};

export const uploadIconsServer = () => {
  return api
    .get(`/icons`)
    .then(({ data }) => data)
    .catch((error) => alert(error));
};

export const uploadDefaultCategoryServer = () => {
  return api
    .get(`/defaultCategory`)
    .then(({ data }) => data)
    .catch((error) => alert(error));
};
