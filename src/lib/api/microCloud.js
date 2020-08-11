import client from "./client";

// Servers
export const registerMcServer = ({
    cpIdx, serialNumber, type, ipAddr,
}) => client.post('/v1/micro/servers/register', {
    cpIdx, serialNumber, type, ipAddr,
});

export const unregisterMcServer = ({
    idx,
}) => client.post('/v1/micro/servers/unregister', {
    idx,
});

export const getMcServers = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/servers-paging/${rows}/${offset}/${orderBy}/${order}`);

export const getMcServersByCpIdx = ({
    cpIdx,
}) => client.get(`/v1/micro/servers/search-company/${cpIdx}`);

// VMs
export const registerMcVm = ({
    name, cpIdx, serialNumber, serverIdx, image, cpu, ram, hdd,
}) => client.post('/v1/micro/vms/register', {
    name, cpIdx, serialNumber, serverIdx, os: image, cpu, ram, hdd,
});

export const getMcVms = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/vms-paging/${rows}/${offset}/${orderBy}/${order}`);

export const unregisterMcVm = ({
    idx,
}) => client.post('/v1/micro/vms/unregister', {
    idx,
});

export const getMcNetworks = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/networks-paging/${rows}/${offset}/${orderBy}/${order}`);

export const getMcImages = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/images-paging/${rows}/${offset}/${orderBy}/${order}`);
