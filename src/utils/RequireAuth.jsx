import React from 'react';
import { Navigate } from "react-router-dom";
import { isLogin } from './services/auth';


function RequireAuth({ children, redirectTo }) {
    return isLogin() ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;