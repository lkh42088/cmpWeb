import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Chart from '../../../Test/Chart/index';
import Code from '../../../Test/Code/index';
import Temp from '../../../Test/Temp/index';
import UI from '../../../Test/UI/index';

export default () => (
    <Switch>
        <Route path="/test/chart" component={Chart} />
        <Route path="/test/code" component={Code} />
        <Route path="/test/temp" component={Temp} />
        <Route path="/test/ui" component={UI} />
    </Switch>
);
