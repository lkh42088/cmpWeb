import client from "./client";

// Monitor mem
// eslint-disable-next-line import/prefer-default-export
export const getMcNetworksMem = () => client.get(`/v1/micro/monitor/mem`);
