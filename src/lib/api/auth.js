import client from './client';

export const login = ({ username, password }) => client.post('/api/auth/login', { id: username, password });
export const loginEmail = ({ username, password, email }) => client.post('/api/auth/login', { id: username, password, email });
export const loginConfirm = ({ username, password, email }) => client.post('/api/auth/confirm', { id: username, password, email });
export const register = ({
 name, email, username, password,
}) => client.post('/api/auth/grouplogin', {
 name, email, username, password,
});
export const check = () => client.get('/api/auth/check');
export const logout = () => client.post('/api/auth/logout');
