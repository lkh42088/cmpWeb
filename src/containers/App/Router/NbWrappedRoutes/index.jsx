import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Layout from '../../../Layout/index';
import Assets from './Assets';
import Customer from './Customer';
import Management from "./Management";
import DefaultPages from './DefaultPages';
import Subnet from "./Subnet";
import Dashboards from "./Dashboards";
//import Account from "./_Account";
import Test from "./Test";
import RouteIf from '../RouteIf';
import {NORMAL_USER} from "../../../../lib/var/globalVariable";

const menuLevel = [
    {
        path: '/assets',
        level: 4,
        component: Assets,
    },
    {
        path: '/customers',
        level: 4,
        component: Customer,
    },
    {
        path: '/management',
        level: 4,
        component: Management,
    },
    {
        path: '/subnet',
        level: 4,
        component: Subnet,
    },
    {
        path: '/default_pages',
        level: 4,
        component: DefaultPages,
    },
    {
        path: '/dashboards',
        level: 10,
        component: Dashboards,
    },
    {
        path: '/test',
        level: 10,
        component: Test,
    },
];

export default ({history}) => {
    //const existSession = localStorage.getItem("user");
    const user = JSON.parse(localStorage.getItem("user"));
    let level = '';

    if (user) {
        // eslint-disable-next-line prefer-destructuring
        level = user.level;
    }

    if (user) {
        return (
            <div>
                <Layout/>
                <div className="container__wrap"
                     style={level === NORMAL_USER ? {
                         padding: "90px 0 0 0",
                     } : {}}>
                    {menuLevel && menuLevel.map((row, index) => {
                        const keyId = index;
                        return (
                            <RouteIf
                                key={keyId}
                                path={row.path} role={user}
                                menuLevel={row} history={history}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
    return (<Redirect to="/"/>);
};
