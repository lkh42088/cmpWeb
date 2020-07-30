import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Layout from '../../../Layout/index';
import Assets from './Assets';
import Customer from './Customer';
import Management from "./Management";
import DefaultPages from './DefaultPages';
import Subnet from "./Subnet";
import Dashboards from "./Dashboards";
import Account from "./Account";

export default () => {
    const existSession = localStorage.getItem("user");
    if (existSession) {
        return (
            <div>
                <Layout/>
                <div className="container__wrap">
                    <Route path="/assets" component={Assets}/>
                    <Route path="/customers" component={Customer}/>
                    <Route path="/management" component={Management}/>
                    <Route path="/subnet" component={Subnet}/>
                    <Route path="/default_pages" component={DefaultPages}/>
                    <Route path="/404" component={DefaultPages}/>
                    <Route path="/dashboards" component={Dashboards}/>
                    <Route path="/account" component={Account}/>
                </div>
            </div>
        );
    }
    return (<Redirect to="/" />);
};
