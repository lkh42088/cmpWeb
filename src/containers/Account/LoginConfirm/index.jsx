import React from 'react';
import LoginCard from './components/LoginCard';

const LogInConfirmEmail = ({ match }) => {
    const { secret } = match.params;
    return (
        <div className="account account--not-photo">
            <LoginCard secret={secret}/>
        </div>
    );
};

export default LogInConfirmEmail;
