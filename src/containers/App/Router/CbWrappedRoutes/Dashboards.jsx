import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardManager from '../../../Dashboards/Manager/index';

export default () => (
    <Switch>
        <Route path="/dashboards/manager" component={DashboardManager} />
    </Switch>
);
