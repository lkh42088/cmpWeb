const assetsActions = {
    addASSETS(equCode, division, manufacturer, model, ip, ownership,
              ownershipDivision, customer, idc, size, usage) {
        return {
            type: 'ADD_ASSETS',
            equCode, division, manufacturer, model, ip, ownership,
            ownershipDivision, customer, idc, size, usage,
        };
    },
};
export default assetsActions;
