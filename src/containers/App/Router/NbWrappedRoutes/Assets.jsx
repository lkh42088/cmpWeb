import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from '../../../Assets/ProductList/index';

export default () => (
    <Switch>
        <Route path="/assets/server" component={ProductList} />
        <Route path="/assets/network" component={ProductList} />
        <Route path="/assets/part" component={ProductList} />
    </Switch>
);
