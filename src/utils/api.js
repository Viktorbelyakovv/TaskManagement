import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const UploadList = () => {
  return api
    .get(`/tasks`)
    .then((list) => list.data)
    .catch((error) => alert(error));
};

export const AddTask = (title) => {
  return api
    .post(`/tasks`, {
      title,
      completed: false,
      favorite: false,
    })
    .then((response) => response)
    .catch((error) => alert(error));
};

export const DeleteTask = (id) => {
  return api
    .delete(`/tasks/${id}`)
    .then((response) => response)
    .catch((error) => alert(error));
};

export const ChangeTitle = (id, title) => {
  return api
    .patch(`/tasks/${id}`, { title })
    .then((response) => response)
    .catch((error) => alert(error));
};

export const ChangeCompleted = (id, completed) => {
  return api
    .patch(`/tasks/${id}`, { completed })
    .then((response) => response)
    .catch((error) => alert(error));
};

export const ChangeFavorite = (id, favorite) => {
  return api
    .patch(`/tasks/${id}`, { favorite })
    .then((response) => response)
    .catch((error) => alert(error));
};
