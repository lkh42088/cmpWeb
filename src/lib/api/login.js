import client from './client';

export const login = ({
    username,
    password,
}) => client.post('/v1/auth/login', {
    id: username,
    password,
});

export const loginEmail = ({
    username, password, email,
}) => client.post('/v1/auth/login-send-email', {
    id: username, password, email,
});

export const loginConfirm = ({
    username, password, email,
}) => client.post('/v1/auth/confirm', {
    id: username, password, email,
});

export const loginEmailConfirm = ({
 id, target, secret,
}) => client.post('v1/auth/email_confirm', {
 id, target, secret,
});

export const checkLogin = () => client.get('/v1/auth/check');
export const logout = () => client.post('/v1/auth/logout');
