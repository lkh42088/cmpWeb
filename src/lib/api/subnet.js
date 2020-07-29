import client from "./client";

export const createSubnet = ({
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.post('/v1/subnet/create', {
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}).then(response => response);

// export const readSubnet = ({
//     rows, offset, orderBy, order, searchParam,
// }) => client.get(`/v1/subnet/${rows}/${offset}/${orderBy}/${order}/`)
//     .then(response => response);

export const readSubnet = ({
    rows, offset, orderBy, order, searchParam,
}) => client.post(`/v1/subnet`, {
    rows, offset, orderBy, order, searchParam,
}).then(response => response);

export const updateSubnet = ({
    idx, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.post('/v1/subnet/update', {
    idx, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}).then(response => response);

export const deleteSubnets = ({idx}) => client.delete(`/v1/subnet/${idx}`).then(response => response);
