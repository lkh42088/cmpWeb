import {combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import ReduxThunk from "redux-thunk";
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
    regUserReducer,
    usersReducer,
    pagingReducer,
    companiesReducer,
    subnetReducer,
} from '../../redux/reducers/index';
import {authSaga} from "../../redux/actions/authActions";
import {tempSetUser, check, userSaga} from "../../redux/actions/accountActions";
import {regUserSaga} from "../../redux/actions/regUserActions";
import {userListSaga} from "../../redux/actions/usersActions";
import {companiesSaga} from "../../redux/actions/companiesActions";

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
    account: accountReducer,
    regUser: regUserReducer,
    userRd: usersReducer,
    pagingRd: pagingReducer,
    companiesRd: companiesReducer,
    subnetRd: subnetReducer,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        regUserSaga(),
        userListSaga(),
        companiesSaga(),
    ]);
}

const logger = createLogger();
export const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk, sagaMiddleware /* , logger */),
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
