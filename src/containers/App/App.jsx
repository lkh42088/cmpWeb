import React, {Component, Fragment} from 'react';
import {connect, Provider} from 'react-redux';
// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용
// store를 props로 전달해 줘야 함
import {BrowserRouter} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
/*import * as firebase from 'firebase/app';*/
/*import 'firebase/auth';*/
// eslint-disable-next-line import/no-extraneous-dependencies
import {hot} from 'react-hot-loader';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import '../../scss/app.scss';
import PropTypes from 'prop-types';
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from "redux-thunk";
import Router from './Router';
import store, {sagaMiddleware, rootSaga, loadUser} from './store';
import ScrollToTop from './ScrollToTop';
import {config as i18nextConfig} from '../../translations';
import Loading from '../../shared/components/Loading';

i18next.init(i18nextConfig);

const ThemeComponent = ({children, themeName}) => {
    const theme = createMuiTheme({
        palette: {
            type: themeName === 'theme-dark' ? 'dark' : 'light',
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

//children: PropTypes.arrayOf(PropTypes.element).isRequired,
ThemeComponent.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.object.isRequired,
    themeName: PropTypes.string.isRequired,
};

const ConnectedThemeComponent = connect(state => ({themeName: state.theme.className}))(ThemeComponent);

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            loaded: false,
        };
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            this.setState({loading: false});
            setTimeout(() => this.setState({loaded: true}), 200);
        });
        /*firebase.initializeApp(firebaseConfig);*/
    }

    /*onRedirectCallbackAuth0 = (appState) => {
      window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname,
      );
    };*/

    render() {
        const {loaded, loading} = this.state;
        sagaMiddleware.run(rootSaga);
        loadUser();
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <I18nextProvider i18n={i18next}>
                        <ScrollToTop>
                            <Fragment>
                                {!loaded
                                && (
                                    <Loading loading={loading}/>
                                )
                                }
                                <ConnectedThemeComponent>
                                    <div>
                                        <Router/>
                                    </div>
                                </ConnectedThemeComponent>
                            </Fragment>
                        </ScrollToTop>
                    </I18nextProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default hot(module)(App);
