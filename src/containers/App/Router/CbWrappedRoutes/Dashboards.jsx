import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardManager from '../../../Dashboards/Manager/index';
import DashboardCustomer from '../../../Dashboards/Customer/index';
import CustomerBilling from "../../../Dashboards/Customer/components/CustomerBilling";

export default () => (
    <Switch>
        <Route path="/dashboards/customer" component={DashboardCustomer} />
        <Route path="/dashboards/manager" component={DashboardManager} />
        <Route path="/dashboards/test" component={CustomerBilling} />
    </Switch>
);
