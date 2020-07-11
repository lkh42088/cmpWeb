import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ChartsJS from '../../../EasyDev/Charts/ChartJs/index';
import ReactVis from '../../../EasyDev/Charts/ReactVis/index';
import Recharts from '../../../EasyDev/Charts/Recharts/index';

export default () => (
  <Switch>
    <Route path="/charts/charts_js" component={ChartsJS} />
    <Route path="/charts/react_vis" component={ReactVis} />
    <Route path="/charts/recharts" component={Recharts} />
  </Switch>
);
