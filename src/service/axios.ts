import axios from 'axios';

export const Axios = axios.create({
  // baseURL: 'http://localhost:8099',
  baseURL: 'https://blog-api-5l0l.onrender.com',
  // headers: {
  //   "Content-type": "multi",
  // },
  // withCredentials: true,
});