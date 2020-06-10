import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Commerce from './Commerce';
import Crypto from './Crypto';
import Documentation from './Documentation';
import DefaultPages from './DefaultPages';
import Account from './Account';
import ECommerce from './ECommerce';
import Maps from './Maps';
import Charts from './Charts';
import Tables from './Tables';
import Forms from './Forms';
import UI from './UI';

import Chat from '../../../Chat/index';
import Todo from '../../../Todo/index';

import FitnessDashboard from '../../../Dashboards/Fitness/index';
import DefaultDashboard from '../../../Dashboards/Default/index';
import MobileAppDashboard from '../../../Dashboards/MobileApp/index';
import BookingDashboard from '../../../Dashboards/Booking/index';

import Mail from '../../../Mail/index';

export default () => (
    <div>
        <Layout />
        <div className="container__wrap">
            <Route path="/org/dashboard_default" component={DefaultDashboard} />
            <Route path="/org/dashboard_e_commerce" component={Commerce} />
            <Route path="/org/dashboard_fitness" component={FitnessDashboard} />
            <Route path="/org/dashboard_crypto" component={Crypto} />
            <Route exact path="/org/dashboard_mobile_app" component={MobileAppDashboard} />
            <Route path="/org/dashboard_booking" component={BookingDashboard} />
            <Route path="/org/ui" component={UI} />
            <Route path="/org/mail" component={Mail} />
            <Route path="/org/chat" component={Chat} />
            <Route path="/org/todo" component={Todo} />
            <Route path="/org/forms" component={Forms} />
            <Route path="/org/tables" component={Tables} />
            <Route path="/org/charts" component={Charts} />
            <Route path="/org/maps" component={Maps} />
            <Route path="/org/account" component={Account} />
            <Route path="/org/e-commerce" component={ECommerce} />
            <Route path="/org/default_pages" component={DefaultPages} />
            <Route path="/org/documentation" component={Documentation} />
        </div>
    </div>
);
