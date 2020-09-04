import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Layout from '../../../Layout/index';
import Micro from "./Micro";
import RouteIf from '../RouteIf';

const menuLevel = [
    {
        path: '/micro',
        level: 2,
        component: Micro,
    },
];

export default ({history}) => {
    const existSession = localStorage.getItem("user");
    if (existSession) {
        return (
            <div>
                <Layout/>
                <div className="container__wrap">
                    {menuLevel && menuLevel.map((row, index) => {
                        const keyId = index;
                        return (
                            <RouteIf
                                key={keyId}
                                path={row.path} role={JSON.parse(existSession)}
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
