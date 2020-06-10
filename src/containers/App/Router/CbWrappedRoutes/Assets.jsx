import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from '../../../Assets/ProductList/index';

export default () => (
    <Switch>
        <Route path="/assets/list" component={ProductList} />
    </Switch>
);
