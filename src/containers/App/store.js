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
    accountReducer,
    loadingReducer,
    usersReducer,
    pagingReducer,
    companiesReducer,
} from '../../redux/reducers/index';
import {checkLoginUser, userSaga} from "../../redux/actions/loginActions";
import {usersSaga} from "../../redux/actions/usersActions";
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
    loading: loadingReducer,
    accountRd: accountReducer,
    usersRd: usersReducer,
    pagingRd: pagingReducer,
    companiesRd: companiesReducer,
});

export function* rootSaga() {
    yield all([
        userSaga(),
        usersSaga(),
        companiesSaga(),
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
        store.dispatch(checkLoginUser());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

export default store;
