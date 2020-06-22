import client from "./client";

export const registerUser = ({
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => client.post('/v1/users/register', {
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
});

export const unregiserUser = ({
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => client.post('/v1/users/unregister', {
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
});

export const checkDupUser = ({
    userId,
}) => client.post('/v1/users/check-user', {
    id: userId,
});

export const getUserList = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/users/${rows}/${offset}/${orderBy}/${order}`);
