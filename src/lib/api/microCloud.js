import client from "./client";

// Servers
export const registerMcServer = ({
                                     cpIdx, serialNumber, type, ipAddr, registerType, domainPrefix, domainId, domainPassword,
                                 }) => client.post('/v1/micro/servers/register', {
    cpIdx,
    serialNumber,
    type,
    ipAddr,
    registerType,
    domainPrefix,
    domainId,
    domainPassword,
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
                                 name, cpIdx, serialNumber, serverIdx, os, image, cpu, ram, hdd, network, snapType, snapDays, snapHours, snapMinutes, vmUserId,
                             }) => client.post('/v1/micro/vms/register', {
    name,
    cpIdx,
    serialNumber,
    serverIdx,
    os,
    image,
    cpu,
    ram,
    hdd,
    network,
    snapType,
    snapDays,
    snapHours,
    snapMinutes,
    vmUserId,
});

export const sendVmAction = ({
                                 idx, vmAction,
                             }) => client.post('/v1/micro/vms/action', {
    idx,
    vmAction,
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
    name,
    cpIdx,
    serialNumber,
    serverIdx,
    os,
    image,
    cpu,
    ram,
    hdd,
    network,
});

export const getMcNetworks = ({
                                  rows, offset, orderBy, order,
                              }) => client.get(`/v1/micro/networks-paging/${rows}/${offset}/${orderBy}/${order}`);

export const getMcNetworksByServerIdx = ({
                                             serverIdx,
                                         }) => client.get(`/v1/micro/networks/${serverIdx}`);

export const getVmInterfaceTraffic = ({
                                          mac,
                                      }) => client.get(`/v1/micro/monitor/stats/${mac}`)
    .then(response => response);

export const getVmInfo = ({
                              mac,
                          }) => client.get(`/v1/micro/monitor/info/${mac}`)
    .then(response => response);

/* "/v1/micro/vms-graph/undefined" */
export const getMcVmsGraph = (mac, currentStatus) => client.get(`/v1/micro/vms-graph/${mac}/${currentStatus}`);


export const getServeries = () => client.get(`/v1/micro/monitor/stats/`)
    .then(response => response);

export const getSystemInfoByMac = mac => client.get(`/v1/micro/dashboard/system/${mac}`)
    .then(response => response);

export const getMcVmsCountByCpName = cpName => client.get(`/v1/micro/dashboard/vmcnt/${cpName}`)
    .then(response => response);

export const getMcSnapshotCountByCpIdx = cpIdx => client.get(`/v1/micro/dashboard/snapshotcnt/${cpIdx}`)
    .then(response => response);

// 관리자 대시보드를 위한 Baremetal total count, VM total count 조회
export const getTotalCount = () => client.get(`/v1/micro/dashboard/total-cnt`)
    .then(response => response);

// 관리자 대시보드를 위한 Resource data 조회
export const getRankingData = () => client.get(`/v1/micro/dashboard/rank`)
    .then(response => response);

export const getMcVmSnapshot = ({
                                    rows, offset, orderBy, order, cpName,
                                }) => client.get(`/v1/micro/snapshot-paging/${rows}/${offset}/${orderBy}/${order}/${cpName}`);

export const deleteSnapshotList = ({
                                       idx,
                                   }) => client.post('/v1/micro/vms/snapshot/delete-entry-list', {
    idx,
});

export const recoveryMcVm = ({
                                 idx, serverIdx, vmName, name,
                             }) => client.post('/v1/micro/vms/snapshot/recovery', {
    idx,
    serverIdx,
    vmName,
    name,
});

export const updateMcVmSnapshot = ({
                                       idx, cpIdx, vmIndex, serverIdx, snapDays, snapHours, snapMinutes,
                                   }) => client.post('/v1/micro/vms/update-from-mc/snapshot', {
    idx,
    cpIdx,
    vmIndex,
    serverIdx,
    snapDays,
    snapHours,
    snapMinutes,
});

// id 중복체크 ()
/*
* 1. user 테이블에 해당 id 존재하는지 확인
* 2. 해당 회사의 vm에 user가 등록되어 있는지 중복체크
* */
export const checkUserCheck = ({id, cpIdx}) => client.get(`/v1/micro/vms/check/user/${id}/${cpIdx}`);
