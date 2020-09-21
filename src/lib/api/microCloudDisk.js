import client from "./client";

// Monitor disk
// eslint-disable-next-line import/prefer-default-export
export const getMcNetworksDisk = mac => client.get(`/v1/micro/monitor/disk/${mac}`);
