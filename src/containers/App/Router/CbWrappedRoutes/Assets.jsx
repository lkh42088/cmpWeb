import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from '../AuthRoute';

import ProductList from '../../../Assets/ProductList/index';

export default ({history}) => (
    <Switch>
        {/*<AuthRoute
            authenticated={localStorage.getItem('user')}
            path="/assets/server"
            render={props => <ProductList {...props} />}
            history={history}
        />*/}
        <Route path="/assets/server" component={ProductList} />
        <Route path="/assets/network" component={ProductList} />
        <Route path="/assets/part" component={ProductList} />
    </Switch>
);
