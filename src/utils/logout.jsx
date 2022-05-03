import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authAC } from '../store/action-creators';
import { web3authLogout } from './services/web3auth';



async function Logout() {
  console.log('inside Logout')
  const dispatch = useDispatch();
  const _auth = bindActionCreators(authAC, dispatch);
  _auth.setAuthData(null);
  await web3authLogout();
  localStorage.clear();
  return <Navigate to={'/'} />;
}

export default Logout