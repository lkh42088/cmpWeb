/************************************************************************
 * Global Variable
 ************************************************************************/
export const GV_LOGIN_PAGE_FIRST = 0;
export const GV_LOGIN_PAGE_INPUT_EMAIL = 1;
export const GV_LOGIN_PAGE_CONFIRM_EMAIL = 2;

const SERVER_IP = process.env.HOST || '127.0.0.1';
export const SERVER_PORT = process.env.PORT || '4000';
export const API_SERVER_IP = process.env.API_SERVER_IP || '127.0.0.1';
export const API_SERVER_PORT = process.env.API_SERVER_PORT || '8081';
export const API_SERVER_WEBSOCK_PORT = process.env.API_SERVER_WEBSOCK_PORT || '8083';

// For ReCAPTCHA
export const SITE_KEY = process.env.RECAPTCHA_SITE_KEY || "";

// For Assets and Breadcrumbs
export const SEPARATION_URL = `http://${API_SERVER_IP}:${SERVER_PORT}/`;
