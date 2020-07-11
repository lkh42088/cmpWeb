import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Cart from '../../../EasyDev/ECommerce/Cart/index';
import OrdersList from '../../../EasyDev/ECommerce/OrdersList/index';
import Payment from '../../../EasyDev/ECommerce/Payment/index';
import ProductEdit from '../../../EasyDev/ECommerce/ProductEdit/index';
import ProductsList from '../../../EasyDev/ECommerce/ProductsList/index';
import Catalog from '../../../EasyDev/ECommerce/Catalog/index';
import ProductPage from '../../../EasyDev/ECommerce/ProductPage/index';

export default () => (
  <Switch>
    <Route path="/e-commerce/cart" component={Cart} />
    <Route path="/e-commerce/catalog" component={Catalog} />
    <Route path="/e-commerce/orders_list" component={OrdersList} />
    <Route path="/e-commerce/payment" component={Payment} />
    <Route path="/e-commerce/product_edit" component={ProductEdit} />
    <Route path="/e-commerce/product_page" component={ProductPage} />
    <Route path="/e-commerce/products_list" component={ProductsList} />
  </Switch>
);
