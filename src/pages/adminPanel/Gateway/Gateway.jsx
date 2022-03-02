import React from 'react';
import Overlay from '../../../containers/Overlay/Overlay';
import './Gateway.scss'

function Gateway() {
    return <div className="gateway">
        <Overlay />
        <div className="gateway__title">
            <p>Gateway</p>
        </div>
    </div>;
}

export default Gateway;
