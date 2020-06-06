import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CustomerList from '../../../Member/Customer/index';
import UsersList from "../../../Customer/Users/index";

export default () => (
    <Switch>
        <Route path="/member/customer/list" component={CustomerList} />
        <Route path="/member/user/list" component={UsersList} />
    </Switch>
);
