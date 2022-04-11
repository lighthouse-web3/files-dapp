import React from 'react';
import Overlay from '../../../containers/Overlay/Overlay';
import './Gateway.scss'

function Gateway() {
    return <div className="gateway">
        {/* <Overlay /> */}
        <div className="gateway__title">
            <p>Gateway</p>
        </div>

        <div className="gateway__content">
            <p>Add Subdoamin at lighthouse.storage</p>
            <input type="text" placeholder='Enter Subdomain' />
            <button className="btn">Add Subdomain</button>
        </div>
    </div>;
}

export default Gateway;
