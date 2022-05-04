// import React from 'react'
import { useNavigate } from 'react-router-dom';
import History from './navigationHistory';

function NavigationSetter() {
    History.navigate = useNavigate();
    return null
}

export default NavigationSetter