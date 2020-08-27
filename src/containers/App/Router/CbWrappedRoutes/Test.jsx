import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chart from '../../../Test/Chart/index';
import Code from '../../../Test/Code/index';

export default () => (
    <Switch>
        <Route path="/test/chart" component={Chart} />
        <Route path="/test/code" component={Code} />
    </Switch>
);
