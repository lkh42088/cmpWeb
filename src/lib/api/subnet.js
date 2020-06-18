import client from "./client";

export const createSubnet = ({
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.post('/v1/subnet/create', {
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
});

export const readSubnet = ({
    size, offset, orderby, order,
}) => client.get(`/v1/subnet/${size}/${offset}/${orderby}/${order}`);
