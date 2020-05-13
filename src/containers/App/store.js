import {combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
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
    userReducer,
    loadingReducer,
} from '../../redux/reducers/index';
import {authSaga} from "../../redux/actions/authActions";
import {tempSetUser, check, userSaga} from "../../redux/actions/userActions";
/*import { composeWithDevTools } from 'redux-devtools-extension';*/

// 여러 리듀서를 쉽게 처리하기 위해 만든 메서드 => combineReducers
const reducer = combineReducers({
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
    user: userReducer,
    loading: loadingReducer,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga()]);
}

export const sagaMiddleware = createSagaMiddleware();

//  리듀서를 파라미터로 받으며, 스토어를 만듬 => createStore()
const store = createStore(reducer, applyMiddleware(ReduxThunk, sagaMiddleware));

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

export default store;
