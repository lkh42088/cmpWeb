import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SubnetWrite from '../../../Management/Subnet';

export default () => (
    <Switch>
        <Route path="/subnet/write" component={SubnetWrite} />
    </Switch>
);
