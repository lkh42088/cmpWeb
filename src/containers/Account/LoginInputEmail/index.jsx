import React from 'react';
import LoginCard from './components/LoginCard';

const LogInInputEmail = ({ match }) => {
    const { secret } = match.params;
    // console.log("LogIN - secret:", secret === undefined);
    return (
        <div className="account account--not-photo">
            <LoginCard secret={secret}/>
        </div>
    );
};

export default LogInInputEmail;
