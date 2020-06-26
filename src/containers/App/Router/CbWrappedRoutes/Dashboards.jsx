import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardManager from '../../../Dashboards/Manager/index';
import DashboardCustomer from '../../../Dashboards/Customer/index';

export default () => (
    <Switch>
        <Route path="/dashboards/manager" component={DashboardManager} />
        <Route path="/dashboards/customer" component={DashboardCustomer} />
    </Switch>
);
