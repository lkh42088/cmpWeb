import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://localhost:8081/';

// client.defaults.headers.common.Autorization = 'Bearer a1b2c3d4';

// for Cookies
client.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default client;
