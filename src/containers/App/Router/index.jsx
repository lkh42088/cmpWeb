import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import WrappedRoutes from './WrappedRoutes';
import TempPage from '../../DefaultPage/TempPage/index';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={TempPage} />
        <Route path="/" component={WrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
