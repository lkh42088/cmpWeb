import client from "./client";

export const registerUser = ({
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => client.post('/api/auth/register', {
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
});
export const unRegiserUser = ({
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => client.post('/api/auth/unregister', {
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
});
