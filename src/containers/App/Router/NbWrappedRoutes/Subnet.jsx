import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubnetList from '../../../Management/Subnet';

export default () => (
    <Switch>
        <Route path="/subnet" component={SubnetList} />
    </Switch>
);
