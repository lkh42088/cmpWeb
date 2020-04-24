import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CustomerList from '../../../Member/Customer/index';

export default () => (
    <Switch>
        <Route path="/member/customer/list" component={CustomerList} />
    </Switch>
);
