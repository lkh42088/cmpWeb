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
    rows, offset, orderBy, order, cpName,
}) => client.get(`/v1/micro/servers-paging/${rows}/${offset}/${orderBy}/${order}/${cpName}`);

export const getMcServersByCpIdx = ({
    cpIdx,
}) => client.get(`/v1/micro/servers/search-company/${cpIdx}`);

// VMs
export const registerMcVm = ({
    name, cpIdx, serialNumber, serverIdx, os, image, cpu, ram, hdd, network,
}) => client.post('/v1/micro/vms/register', {
    name, cpIdx, serialNumber, serverIdx, os, image, cpu, ram, hdd, network,
});

export const getMcVms = ({
    rows, offset, orderBy, order, cpName,
}) => client.get(`/v1/micro/vms-paging/${rows}/${offset}/${orderBy}/${order}/${cpName}`);

export const unregisterMcVm = ({
    idx,
}) => client.post('/v1/micro/vms/unregister', {
    idx,
});

// Images
export const getMcImages = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/images-paging/${rows}/${offset}/${orderBy}/${order}`);

export const getMcImagesByServerIdx = ({
    serverIdx,
}) => client.get(`/v1/micro/images/${serverIdx}`);

// Virtual Network
export const registerMcNetwork = ({
    name, cpIdx, serialNumber, serverIdx, os, image, cpu, ram, hdd, network,
}) => client.post('/v1/micro/networks/register', {
    name, cpIdx, serialNumber, serverIdx, os, image, cpu, ram, hdd, network,
});

export const getMcNetworks = ({
    rows, offset, orderBy, order,
}) => client.get(`/v1/micro/networks-paging/${rows}/${offset}/${orderBy}/${order}`);

export const getMcNetworksByServerIdx = ({
    serverIdx,
}) => client.get(`/v1/micro/networks/${serverIdx}`);

export const getVmInterfaceTraffic = ({
    mac,
}) => client.get(`/v1/micro/monitor/stats/${mac}`).then(response => response);

/* "/v1/micro/vms-graph/undefined" */
export const getMcVmsGraph = (mac, currentStatus) => client.get(`/v1/micro/vms-graph/${mac}/${currentStatus}`);


export const getServeries = () => client.get(`/v1/micro/monitor/stats/`).then(response => response);
