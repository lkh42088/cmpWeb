import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import CbWrappedRoutes from './CbWrappedRoutes';
import LogInPage from "../../Login/LogInPage";
// import Register from "../../Account/Register";
// import RegisterUser from "../../Account/RegisterUser";
// import LogInInputEmail from "../../Account/LoginInputEmail";
// import LogInConfirmEmail from "../../Account/LoginConfirm";
import LogInEmailAuth from "../../Account/LoginEmailAuth";

const Router = () => (
  <MainWrapper>
    <main>
        <Switch>
            <Route exact path="/" component={LogInPage} />

            {/*<Route path="/login/confirm" component={LogInConfirmEmail} />*/}
            {/*<Route path="/login/input_email" component={LogInInputEmail} />*/}
            <Route path="/login/email/:id/:target/:secret" component={LogInEmailAuth} />
            <Route path="/login" component={LogInPage} />

            {/*<Route path="/register" component={Register} />*/}
            {/*<Route path="/registeruser" component={RegisterUser} />*/}
            <Route path="/org" component={WrappedRoutes} />
            <Route path="/" component={CbWrappedRoutes} />
        </Switch>
    </main>
  </MainWrapper>
);

export default Router;
