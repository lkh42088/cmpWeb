import React, {Component, Fragment} from 'react';
import {connect, Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import {hot} from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import '../../scss/app.scss';
import PropTypes from 'prop-types';
import Router from './Router';
import store from './store';
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
    }

    render() {
        const {loaded, loading} = this.state;
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <I18nextProvider i18n={i18next}>
                        <ScrollToTop>
                            <Fragment>
                                {!loaded
                                && (
                                    <Loading loading={loading}/>
                                )}
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
