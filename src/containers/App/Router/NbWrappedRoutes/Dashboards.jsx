import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardManager from '../../../Dashboards/Manager/index';
import DashboardCustomer from '../../../Dashboards/Customer/index';
import MicroDashboardManager from '../../../MicroDashboards/Manager/index';
import MicroDashboardCustomer from '../../../MicroDashboards/Customer/index';
import MicroCloudDashboard from "../../../MicroCloud/Dashboard";

export default () => (
    <Switch>
        <Route path="/dashboards/customer" component={DashboardCustomer} />
        <Route path="/dashboards/manager" component={DashboardManager} />
        <Route path="/dashboards/micro" component={MicroCloudDashboard} />
        <Route path="/dashboards/micro-customer" component={MicroDashboardCustomer} />
        <Route path="/dashboards/micro-manager" component={MicroDashboardManager} />
    </Switch>
);
