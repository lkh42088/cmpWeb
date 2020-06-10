import client from "./client";

export const addCompany = ({
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
}) => client.post('/v1/customers/companies-add', {
    id, password, name, email, emailAuthFlag, emailAuthGroupFlag, emailAuthGroupList,
});

export const getCompanyList = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/customers/companies/${rows}/${offset}/${orderBy}/${order}`);
