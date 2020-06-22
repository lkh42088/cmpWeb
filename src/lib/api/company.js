import client from "./client";

export const addCompany = ({
    cpName, cpZip, cpAddr, cpAddrDetail, cpHomepage, cpTel, cpEmail, cpIsCompany, cpMemo, cpTerminationDate,
}) => client.post('/v1/customers/companies', {
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
});

export const checkDuplicatedCompany = ({
    cpName,
}) => client.post('/v1/customers/check-company', {
    name: cpName,
});

export const getCompanyList = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/customers/companies/${rows}/${offset}/${orderBy}/${order}`);
