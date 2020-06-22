import {combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import ReduxThunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {
    sidebarReducer,
    themeReducer,
    customizerReducer, rtlReducer,
    todoReducer,
    assetsReducer,
    titleReducer,
    authReducer,
    accountReducer,
    loadingReducer,
    usersReducer,
    pagingReducer,
    companiesReducer,
    subnetReducer,
} from '../../redux/reducers/index';
import {authSaga} from "../../redux/actions/authActions";
import {tempSetUser, check, userSaga} from "../../redux/actions/accountActions";
import {usersSaga} from "../../redux/actions/usersActions";
import {companiesSaga} from "../../redux/actions/companiesActions";
import {createSubnetSaga, readSubnetSaga} from "../../redux/actions/subnetActions";

const rootReducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    rtl: rtlReducer,
    sidebar: sidebarReducer,
    customizer: customizerReducer,
    todos: todoReducer,
    assets: assetsReducer,
    menuTitle: titleReducer,
    auth: authReducer,
    loading: loadingReducer,
    account: accountReducer,
    usersRd: usersReducer,
    pagingRd: pagingReducer,
    companiesRd: companiesReducer,
    subnetRd: subnetReducer,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        usersSaga(),
        companiesSaga(),
        createSubnetSaga(),
        readSubnetSaga(),
    ]);
}

const logger = createLogger();
export const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware /* , logger */)),
);

export function loadUser() {
    try {
        const user = localStorage.getItem('user');
        if (!user) return;

        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

export default store;
