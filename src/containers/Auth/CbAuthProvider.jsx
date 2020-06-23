import React, {useState, useContext, useEffect } from 'react';

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const CbAuthProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {

    }, []);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
};

export default CbAuthProvider;
