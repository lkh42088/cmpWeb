import { handleActions } from 'redux-actions';
import produce from 'immer';
import {List, Map} from "immutable";
import {
    // INIT_SUBNET,
    CREATE_SUBNET,
    DELETE_SUBNET,
    INPUT_SUBNET,
    READ_SUBNET,
    READ_SUBNET_SUCCESS,
    READ_SUBNET_FAILURE,
    SEARCH_DEVICE_SUBNET,
    UPDATE_SUBNET,
} from "../actions/subnetActions";

const initSubnet = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0, // total count
        rows: 0,
        offset: 0,
        orderBy: "sub_idx",
        order: "asc",
        currentPage: 0,
    },
};

const subnetReducer = handleActions(
    {
        [CREATE_SUBNET]: () => ({

        }),
        [SEARCH_DEVICE_SUBNET]: () => ({

        }),
        [READ_SUBNET]: () => ({

        }),
        [READ_SUBNET_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
        [UPDATE_SUBNET]: () => ({

        }),
        [DELETE_SUBNET]: () => ({

        }),
    },
    initSubnet,
);

export default subnetReducer;
