import React from 'react';
import LoginBase from "./components/LoginBase";

const LogIn = ({history}) => (
        <div className="login">
            {/*<div className="account account--not-photo ">*/}
            <LoginBase history={history} />
        </div>
    );

export default LogIn;
