import {combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import ReduxThunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {
    cryptoTableReducer,
    newOrderTableReducer,
    sidebarReducer,
    themeReducer,
    customizerReducer,
    rtlReducer,
    todoReducer,
    assetsReducer,
    titleReducer,
    authReducer,
    accountReducer,
    loadingReducer,
    usersReducer,
    userRegisterReducer,
    pagingReducer,
    companiesReducer,
} from '../../redux/reducers/index';
import {authSaga} from "../../redux/actions/authActions";
import {setLoginUser, checkLoginUser, userSaga} from "../../redux/actions/accountActions";
import {usersSaga} from "../../redux/actions/usersActions";
import {companiesSaga} from "../../redux/actions/companiesActions";
import {createSubnetSaga} from "../../redux/actions/subnetActions";

const rootReducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    rtl: rtlReducer,
    sidebar: sidebarReducer,
    cryptoTable: cryptoTableReducer,
    newOrder: newOrderTableReducer,
    customizer: customizerReducer,
    todos: todoReducer,
    assets: assetsReducer,
    menuTitle: titleReducer,
    auth: authReducer,
    loading: loadingReducer,
    accountRd: accountReducer,
    usersRd: usersReducer,
    userRegisterRd: userRegisterReducer,
    pagingRd: pagingReducer,
    companiesRd: companiesReducer,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        usersSaga(),
        companiesSaga(),
        createSubnetSaga(),
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
        if (!user) {
            return;
        }
        store.dispatch(setLoginUser(user));
        store.dispatch(checkLoginUser());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

export default store;
