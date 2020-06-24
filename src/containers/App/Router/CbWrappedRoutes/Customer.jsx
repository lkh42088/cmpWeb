import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Customers from '../../../Member/Customer/index';
import AdminCompanies from "../../../Customer/CompanyMgmt/index";
import Users from "../../../Customer/Users/index";

export default () => (
    <Switch>
        <Route path="/customers/list" component={Customers} />
        <Route path="/customers/admin/companies" component={AdminCompanies} />
        <Route path="/customers/users" component={Users} />
    </Switch>
);
