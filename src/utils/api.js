import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const uploadListServer = () => {
  return api
    .get(`/tasks`)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

export const addTaskServer = (title) => {
  return api
    .post(`/tasks`, {
      title,
      completed: false,
      favorite: false,
    })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const deleteTaskServer = (id) => {
  return api
    .delete(`/tasks/${id}`)
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const changeTitleServer = (id, title) => {
  return api
    .patch(`/tasks/${id}`, { title })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const changeCompletedServer = (id, completed) => {
  return api
    .patch(`/tasks/${id}`, { completed })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const changeFavoriteServer = (id, favorite) => {
  return api
    .patch(`/tasks/${id}`, { favorite })
    .then((response) => response)
    .catch((error) => console.log(error));
};
