import React from "react";
import {Route, Redirect} from "react-router-dom";

function AuthRoute({
                       authenticated, component: Component, render, ...rest
                   }) {
    console.log("authenticated : ", authenticated);
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
                <Redirect
                    to={{pathname: "/login", state: {from: props.location}}}
                />
            ))
            }
        />
    );
}

export default AuthRoute;
