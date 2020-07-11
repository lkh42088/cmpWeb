import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {checkLogin} from "../../../lib/api/login";

function AuthRoute({
    history, authenticated, component: Component, render, ...rest
}) {
    console.log("😡😡😡authenticated : ", authenticated);
    const loginCheck = async () => {
        try {
            const response = await checkLogin();
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            history.push('/login');
        }
    };

    useEffect(() => {
        if (authenticated === null) {
            loginCheck();
        }
    }, []);

    console.log("😡😡😡authenticated  XXX: ", authenticated);

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
            ))
            }
        />
    );
}

export default AuthRoute;
