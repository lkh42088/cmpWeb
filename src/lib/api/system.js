import client from "./client";

export const agentRestart = ({
    agentType, ipAddr,
}) => client.post(`/v1/system/restart`, {
    agentType, ipAddr,
});

export const modifyConfigFile = ({
    agentType, ipAddr, fieldName, value,
}) => client.post(`/v1/system/modifyConf`, {
    agentType, ipAddr, fieldName, value,
});
