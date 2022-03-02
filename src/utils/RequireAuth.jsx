import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";


function RequireAuth({ children, redirectTo }) {
    const _auth = useSelector((store) => store.auth);
    console.log("PAGE AUTHENTICATED", !!_auth?.address);
    let isAuthenticated = !!_auth?.address;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;