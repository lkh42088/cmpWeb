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

export const HCMP_PUBLIC_MODE = process.env.HCMP_PUBLIC_MODE || 'no';

// For ReCAPTCHA
export const SITE_KEY = process.env.RECAPTCHA_SITE_KEY || "";
export const {RECAPTCHA_ENABLE} = process.env;

// For Assets and Breadcrumbs
export const SEPARATION_URL = `http://${API_SERVER_IP}:${SERVER_PORT}/`;

// User level
export const TOP_MANAGER = 1;
export const NB_MANAGER = 2;
export const OPERATOR = 4;
export const CUSTOMER_MANAGER = 5;
export const CUSTOMER_USER = 6;
export const NORMAL_USER = 8;
export const TEMP_USER = 9;
export const UNREGISTERED_USER = 10;
