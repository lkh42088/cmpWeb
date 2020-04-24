import React from 'react';
import {Route} from 'react-router-dom';
import Layout from '../../../Layout/index';

import Assets from './Assets';
import Member from './Member';
import Management from "./Management";
import DefaultPages from './DefaultPages';

export default () => (
    <div>
        <Layout/>
        <div className="container__wrap">
            <Route path="/assets" component={Assets}/>
            <Route path="/Member" component={Member}/>
            <Route path="/Management" component={Management}/>
            <Route path="/default_pages" component={DefaultPages}/>

            <Route path="/404" component={DefaultPages}/>
        </div>
    </div>
);
