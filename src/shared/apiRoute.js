 
const API_PREFIX = '/v1';
const API_PREFIX_COMPANY = `${API_PREFIX}/customers/companies`;
const API_ROUTE = `http://127.0.0.1:8081${API_PREFIX}`;
/*

process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://127.0.0.1:8091/api/v1'
  : API_ROUTE = 'https://chodapi.com/api/v1';
*/

export default API_ROUTE;
