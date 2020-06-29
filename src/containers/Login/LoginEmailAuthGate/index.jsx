import React from 'react';
import LoginCard from './components/LoginCard';

const LogInEmailAuth = ({ match }) => {
    const { id } = match.params;
    const { secret } = match.params;
    // console.log("LogIN - secret:", secret === undefined);
    return (
        <div className="account account--not-photo">
            <LoginCard id={id} secret={secret}/>
        </div>
    );
};

export default LogInEmailAuth;
