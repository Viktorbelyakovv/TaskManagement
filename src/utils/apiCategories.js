import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const uploadListServer = () => {
  return api
    .get(`/tasks`)
    .then((list) => list.data)
    .catch((error) => alert(error));
};
