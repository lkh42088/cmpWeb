import client from "./client";

// Monitor cpu
// eslint-disable-next-line import/prefer-default-export
export const getMcNetworksCpu = () => client.get(`/v1/micro/monitor/cpu`);
