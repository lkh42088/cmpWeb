import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Layout from '../../../Layout/index';
import Micro from "./Micro";
import RouteIf from '../RouteIf';
import {NORMAL_USER} from "../../../../lib/var/globalVariable";

const menuLevel = [
    {
        path: '/micro',
        level: 2,
        component: Micro,
    },
];

export default ({history}) => {
    //const existSession = localStorage.getItem("user");
    const user = JSON.parse(localStorage.getItem("user"));
    const {level} = user;

    if (user) {
        return (
            <div>
                <Layout/>
                <div className="container__wrap"
                     style={level === NORMAL_USER ? {
                         padding: "90px 0 0 0",
                         /*width: "100%",
                         top: "90px",
                         margin: "0 auto",*/
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
