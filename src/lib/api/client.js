import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const SERVER_IP = process.env.HOST || '127.0.0.1';
export const SERVER_PORT = process.env.PORT || '4000';
export const API_SERVER_IP = process.env.API_SERVER_IP || '127.0.0.1';
const API_SERVER_PORT = process.env.API_SERVER_PORT || '8081';

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
export const WEB_SERVER_ADDR = `http://${API_SERVER_IP}:${API_SERVER_PORT}`;
export const API_ROUTE = `${WEB_SERVER_ADDR}${API_PREFIX}`;

export default client;

// For ReCAPTCHA
export const SITE_KEY = "6LdrobkZAAAAAOj0wFKiNfmHpJJsoEyu_eqWwptq";
