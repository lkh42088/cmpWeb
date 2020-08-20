import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chart from '../../../Test/Chart/index';

export default () => (
    <Switch>
        <Route path="/test/chart" component={Chart} />
    </Switch>
);
