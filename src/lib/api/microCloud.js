import client from "./client";

export const registerMicroCloudServer = ({
    cpIdx, serialNumber, type, ipAddr,
}) => client.post('/v1/micro/servers/register', {
    cpIdx, serialNumber, type, ipAddr,
});

export const getMicroCloudServers = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/servers/${rows}/${offset}/${orderBy}/${order}`);

export const registerMicroCloudVm = ({
    cpIdx, serialNumber, serverType, ipaddr,
}) => client.post('/v1/micro/servers/register', {
    cpIdx, serialNumber, serverType, ipaddr,
});

export const getMicroCloudVms = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/vms/${rows}/${offset}/${orderBy}/${order}`);
