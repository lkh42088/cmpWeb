import client from "./client";

export const registerCompany = ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail,
    cpIsCompany, cpMemo, cpTerminationDate, userId, userPassword,
}) => client.post('/v1/customers/register', {
    name: cpName,
    zipcode: cpZip,
    address: cpAddr,
    addressDetail: cpAddrDetail,
    homepage: cpHomepage,
    tel: cpTel,
    email: cpEmail,
    isCompany: cpIsCompany,
    memo: cpMemo,
    termDate: cpTerminationDate,
    cpUserId: userId,
    userId,
    userPassword,
});

export const checkDupCompany = ({
    cpName,
}) => client.post('/v1/customers/check-company', {
    name: cpName,
});

export const getCompanyList = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/customers/companies/${rows}/${offset}/${orderBy}/${order}`);

export const getCompaniesByName = ({ cpName }) => client.get(`/v1/companies/${cpName}`);
export const getUsersByCpIdx = ({ cpIdx }) => client.get(`/v1/users-about-companies/${cpIdx}`);
export const getCompanies = () => client.get(`/v1/companies`);
