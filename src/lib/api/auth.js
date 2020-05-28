import client from './client';

export const login = ({ username, password }) => client.post('/api/auth/login', {
    id: username,
    password,
});
export const register = ({
                             name, email, username, password,
}) => client.post('/api/auth/register', {
    name, email, username, password,
});
export const check = () => client.get('/api/auth/check');
export const logout = () => client.post('/api/auth/logout');
