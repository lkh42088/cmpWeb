import axios from 'axios';
import {API_SERVER_IP, API_SERVER_PORT} from "../var/globalVariable";

const client = axios.create();

client.defaults.baseURL = `http://${API_SERVER_IP}:${API_SERVER_PORT}/`;

// client.defaults.headers.common.Autorization = 'Bearer a1b2c3d4';

// for Cookies
client.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

const API_PREFIX = '/v1';
const API_PREFIX_IMG = '/image';
export const WEB_SERVER_ADDR = `http://${API_SERVER_IP}:${API_SERVER_PORT}`;
export const API_ROUTE = `${WEB_SERVER_ADDR}${API_PREFIX}`;
export const API_ROUTE_SERVER_IMAGE = `http://${API_SERVER_IP}:${API_SERVER_PORT}${API_PREFIX_IMG}`;

export default client;
