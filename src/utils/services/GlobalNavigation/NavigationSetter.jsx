
import { useNavigate } from 'react-router-dom';
import History from './navigationHistory';

// Set NavigationSetter between BrowserRouter on index.js 

function NavigationSetter() {
    History.navigate = useNavigate();
    return null
}

export default NavigationSetter