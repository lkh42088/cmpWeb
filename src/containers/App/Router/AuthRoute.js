import React, {useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {check} from "../../../lib/api/auth";

function AuthRoute({
                       history, authenticated, component: Component, render, ...rest
                   }) {
    //console.log("😡😡😡authenticated : ", authenticated);

    const loginCheck = async () => {
        try {
            const response = await check();
            localStorage.setItem('user', JSON.stringify(response.data.user));
            //console.log("2");
        } catch (error) {
            history.push('/login');
            //console.log("3");
        }
    };

    useEffect(() => {
        //console.log("1");
        if (authenticated === null) {
            //console.log("4");
            loginCheck();
        }
    }, []);

    //console.log("😡😡😡authenticated  XXX: ", authenticated);

    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <Route
            {...rest}
            render={props => (
                // eslint-disable-next-line no-nested-ternary
                authenticated ? (
                render ? (
                    render(props)
                ) : (
                    <Component {...props} />
                )
            ) : (
                <div/>
                // <Redirect
                //     to={{pathname: "/login", state: {from: props.location}}}
                // />
            ))
            }
        />
    );
}

export default AuthRoute;
