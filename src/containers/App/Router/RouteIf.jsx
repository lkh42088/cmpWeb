import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {TOP_MANAGER} from "../../../lib/var/globalVariable";

const RouteIf = ({
                     history, path, menuLevel, role, ...rest
                 }) => {
    /*const inMenuLevel = menuLevel.filter(d => d.path === path)[0];*/
    const inMenuLevel = menuLevel;

    return (
        <Route
            {...rest}
            render={(props) => {
                if (role && inMenuLevel) {
                    if (inMenuLevel.level <= TOP_MANAGER) { // 최고관리자는 전체 컴포넌트 접근 가능
                        if (role.level > inMenuLevel.level
                            && history.location.pathname.indexOf(inMenuLevel.path) !== -1) {
                            return history.goBack();
                        }
                    }
                }

                if (inMenuLevel) {
                    if (inMenuLevel.component) {
                        return <inMenuLevel.component {...props}/>;
                    }
                }

                return null;
            }}
        />
    );
};

export default RouteIf;
