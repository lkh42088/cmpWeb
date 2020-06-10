import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Monitoring from '../../../Management/Monitoring/index';

export default () => (
    <Switch>
        <Route path="/management/monitoring/main" component={Monitoring} />
    </Switch>
);
