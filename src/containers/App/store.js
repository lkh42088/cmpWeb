import {combineReducers, createStore, applyMiddleware } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import ReduxThunk from "redux-thunk";

import {
    cryptoTableReducer,
    newOrderTableReducer,
    sidebarReducer,
    themeReducer,
    customizerReducer,
    rtlReducer,
    authReducer,
    todoReducer,
    assetsReducer,
    titleReducer,
} from '../../redux/reducers/index';
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
    user: authReducer,
    todos: todoReducer,
    assets: assetsReducer,
    menuTitle: titleReducer,
});

//  리듀서를 파라미터로 받으며, 스토어를 만듬 => createStore()
const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default store;
