import React from 'react';
import {Route} from 'react-router-dom';
import Layout from '../../../Layout/index';

import Assets from './Assets';
import Member from './Member';
import Management from './Management';
import DefaultPages from './DefaultPages';
import SubnetWrite from './Subnet';

export default () => (
    <div>
        <Layout />
            <div className="container__wrap">
                <Route path="/assets" component={Assets}/>
                <Route path="/member" component={Member}/>
                <Route path="/management" component={Management}/>
                <Route path="/default_pages" component={DefaultPages}/>
                <Route path="/subnet/write" component={SubnetWrite}/>
                <Route path="/404" component={DefaultPages}/>
            </div>
    </div>
);
