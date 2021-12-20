import axios from 'axios';
const api = process.env.REACT_APP_API_LINK;

export function UploadList() {
  return axios.get(`${api}/tasks`)
  .then(list => {
   return list.data
  })
  .catch(function (error) {
    console.log(error);
  })    
}

export function AddTask(title) {
  axios.post(`${api}/tasks`, {
    completed: false,
    title: title
  })
  .then((response) => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })      
}

export function DeleteTask(id) {
  axios.delete(`${api}/tasks/${id}`)
  .then((response) => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })       
}

export function ChangeTitle(id, title) {
  axios.patch(`${api}/tasks/${id}`, {
    title: title
  })
  .then(response => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })      
}

export function ChangeCompleted(id, completed) {
  axios.patch(`${api}/tasks/${id}`, {
    completed: completed
  })
  .then(response => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })    
}