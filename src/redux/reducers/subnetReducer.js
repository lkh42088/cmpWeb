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
    subnetGateway: '',
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
        [INPUT_SUBNET]: (state, action) => ({ ...state, input: action.payload }),
    },
    initSubnet,
);

export default subnetReducer;
