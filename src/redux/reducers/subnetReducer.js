import { handleActions } from 'redux-actions';
import produce from 'immer';
import {
    // INIT_SUBNET,
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
    },
    initSubnet,
);

export default subnetReducer;
