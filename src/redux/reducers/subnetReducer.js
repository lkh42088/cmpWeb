import { handleActions } from 'redux-actions';
import {
    INIT_SUBNET,
    CREATE_SUBNET,
    SEARCH_DEVICE_SUBNET,
    READ_SUBNET,
    UPDATE_SUBNET,
    DELETE_SUBNET,
    INPUT_SUBNET,
} from "../actions/subnetActions";

const initSubnet = {
    deviceCode: '',
    subnetStart: '',
    subnetEnd: '',
    subnetTag: '',
    subnetMask: '',
    gateway: '',
};

const subnetReducer = handleActions(
    {
        [INIT_SUBNET]: () => ({
            initSubnet,
        }),
        [CREATE_SUBNET]: () => ({

        }),
        [SEARCH_DEVICE_SUBNET]: () => ({

        }),
        [READ_SUBNET]: () => ({

        }),
        [UPDATE_SUBNET]: () => ({

        }),
        [DELETE_SUBNET]: () => ({

        }),
        [INPUT_SUBNET]: (state, { payload: { key, value }}) => (
            { ...state, payload: { key, value }}),
    },
    initSubnet,
);

export default subnetReducer;
