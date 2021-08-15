
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const isLogin = async() => {
    return await localStorage.getItem('login-cred')?true:false; 
}

const ProtectedRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin()?
            <Component {...props} />
            :  <Redirect to="/" />
        )} />
    );
};

export default ProtectedRoute;