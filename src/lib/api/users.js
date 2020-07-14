import client from "./client";

export const registerUser = ({
    cpIdx, cpName, id, password, name,
    email, authLevel, hp, tel, zipCode, address,
    addressDetail, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList, memo,
}) => client.post('/v1/users/register', {
    cpIdx,
    cpName,
    id,
    password,
    name,
    email,
    authLevel,
    hp,
    tel,
    zipCode,
    address,
    addressDetail,
    emailAuthFlag,
    emailAuthGroupFlag,
    emailAuthGroupList,
    memo,
});

export const unregisterUser = ({
    idx,
}) => client.post('/v1/users/unregister', {
    idx,
});

export const checkDuplicateUser = ({
    userId,
}) => client.post('/v1/users/check-user', {
    id: userId,
});

export const getUserList = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/users/${rows}/${offset}/${orderBy}/${order}`);

export const getUserListWithSearchParam = ({
    rows, offset, orderBy, order, searchParam,
}) => client.post(`/v1/users/page-with-search-param`, {
    rows, offset, orderBy, order, searchParam,
});
