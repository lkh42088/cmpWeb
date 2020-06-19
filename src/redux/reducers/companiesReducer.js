import {List, Map} from "immutable";
import {handleActions} from "redux-actions";
import produce from "immer";
import {
    COMPANY_REG_CHANGE_FIELD,
    COMPANYLIST_SUCCESS,
} from "../actions/companiesActions";

const initialState = {
    data: List([
        Map({}),
    ]),
    page: {
        count: 0,
        rows: 0,
        offset: 0,
    },
    regCompany: {
        cpName: "",
        cpZip: "",
        cpAddr: "",
        cpAddrDetail: "",
        cpHomepage: "",
        cpTel: "",
        cpEmail: "",
        cpIsCompany: false,
        cpMemo: "",
        cpTerminationDate: new Date(),
    },
};

const companiesReducer = handleActions(
    {
        [COMPANYLIST_SUCCESS]: (state, action) => ({
            ...state,
            data: action.payload.data,
            page: action.payload.page,
        }),
        [COMPANY_REG_CHANGE_FIELD]: (state, { payload: { key, value }}) => produce(state, (draft) => {
            draft.regCompany[key] = value;
        }),
    },
    initialState,
);

export default companiesReducer;
