import client from "./client";

export const createSubnet = ({
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.post('/v1/subnet/create', {
    subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
});

export const getSubnet = ({
    deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
}) => client.get('/v1/subnet/', {
    deviceCode, subnetTag, subnetStart, subnetEnd, subnetMask, gateway,
});
