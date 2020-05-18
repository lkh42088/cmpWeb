import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import TempPage from '../../DefaultPage/TempPage/index';
import LogIn from "../../Account/LogIn";
import Register from "../../Account/Register";

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={TempPage} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/" component={WrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
