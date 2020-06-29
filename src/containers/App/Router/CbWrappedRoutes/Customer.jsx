import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Customers from '../../../Member/Customer/index';
import Companies from "../../../Customer/Company";
import Users from "../../../Customer/Users/index";
import CollapsibleTable from "../../../Customer/Users/components/UserTest";

export default () => (
    <Switch>
        <Route path="/customers/list" component={Customers} />
        <Route path="/customers/companies" component={Companies} />
        <Route path="/customers/users" component={Users} />
        <Route path="/customers/test" component={CollapsibleTable} />
    </Switch>
);
