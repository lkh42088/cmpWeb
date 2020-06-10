import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import CbWrappedRoutes from './CbWrappedRoutes';
import TempPage from '../../DefaultPage/TempPage/index';
import LogIn from "../../Account/LogIn";
import Register from "../../Account/Register";
import RegisterUser from "../../Account/RegisterUser";
import LogInInputEmail from "../../Account/LoginInputEmail";
import LogInConfirmEmail from "../../Account/LoginConfirm";
import LogInEmailAuth from "../../Account/LoginEmailAuth";

const Router = () => (
  <MainWrapper>
    <main>
        <Switch>
            <Route exact path="/" component={TempPage} />
            <Route path="/log_in/confirm" component={LogInConfirmEmail} />
            <Route path="/log_in/input_email" component={LogInInputEmail} />
            {/*<Route path="/log_in/email/:id/:secret" component={EmailConfirmation} />*/}
            <Route path="/log_in/email/:id/:secret" component={LogInEmailAuth} />
            <Route path="/log_in" component={LogIn} />
            <Route path="/register" component={Register} />
            <Route path="/registeruser" component={RegisterUser} />
            <Route path="/org" component={WrappedRoutes} />
            <Route path="/" component={CbWrappedRoutes} />
        </Switch>
    </main>
  </MainWrapper>
);

export default Router;
