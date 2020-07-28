import client from "./client";

export const createSubnet = ({
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.post('/v1/subnet/create', {
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
});

export const readSubnet = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/subnet/${rows}/${offset}/${orderBy}/${order}`);

export const updateSubnet = ({
    idx, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.post('/v1/subnet/update', {
    idx, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
});

export const deleteSubnets = ({idx}) => client.delete(`/v1/subnet/${idx}`);
