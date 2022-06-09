import { Dialog } from '@material-ui/core';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import Overlay from '../../../containers/Overlay/Overlay';
import TweeterTopupDialog from '../../../containers/tweeterTopUpDialog/TweeterTopupDialog';
import { topupAmount, topupStoragePacks, topupValuePacks } from '../../../utils/config/topupConfig';
import { baseUrl } from '../../../utils/config/urls';
import { getAddress, getSignMessage } from '../../../utils/services/auth';
import { notify } from '../../../utils/services/notification';
import './TopUp.scss'




const addTopup = async (value) => {
    console.log(value)

}

const calculateStorage = (value, setTopupStorage) => {
    // storage space per unit (USDC)
    let unitStorage = 1 / topupAmount;
    if (value > 0) {
        setTopupStorage((unitStorage * value).toFixed(2));
    } else {
        setTopupStorage(0);
    }
}

const changeInput = (type, value, inputRef, setTopupStorage) => {
    if (type === 'value') {
        inputRef.current.value = value.toFixed(2);
        calculateStorage(value, setTopupStorage);
    }
    if (type === 'storage') {
        let amount = (value * topupAmount).toFixed(2);
        inputRef.current.value = amount
        calculateStorage(amount, setTopupStorage);
    }
}


function TopUp() {

    const [topupStorage, setTopupStorage] = useState(0);
    const [tweeterTopup, setTweeterTopup] = useState(false);
    const inputRef = useRef(null)

    return <div className="topup">
        {/* <Overlay /> */}
        <div className="topupMain">
            <div className="topupMain__title">
                <p>Topup Lighthouse Storage</p>
                <button className="btn" onClick={() => { setTweeterTopup(true) }}>Get 1 GB for free</button>
            </div>

            <div className="topupMain__description">
                <div className="container">
                    <p>Add Quick Value Topups</p>
                    <div className="valueTopups">
                        {
                            topupValuePacks.map((item, i) =>
                                <p className="planCard" key={i} onClick={() => { changeInput('value', item, inputRef, setTopupStorage) }}>
                                    {`$ ${item.toFixed(2)}`}
                                </p>
                            )
                        }
                    </div>
                </div>
                <div className="line"></div>
                <div className="container">
                    <p>Add Quick Storage Topups</p>
                    <div className="valueTopups">
                        {
                            topupStoragePacks.map((item, i) =>
                                <p className="planCard" key={i} onClick={() => { changeInput('storage', item, inputRef, setTopupStorage) }}>
                                    {`${item} GB`}
                                </p>
                            )
                        }
                    </div>
                </div>

            </div>

            <div className="topupMain__content">

                <div class="input-box">
                    <span class="prefix">$</span>
                    <input type="number" placeholder="Enter Topup Amount" ref={inputRef} onChange={() => { calculateStorage(inputRef.current.value, setTopupStorage) }} />
                    <span class="suffix">.00</span>
                </div>

                <button className="btn" onClick={() => {
                    addTopup(inputRef.current.value)
                }}>
                    {
                        topupStorage > 0 ? <span>
                            Add {topupStorage + ' GB'} to Lighthouse
                        </span> : <span>
                            Add Storage to Lighthouse
                        </span>

                    }

                </button>

            </div>

            <Dialog open={tweeterTopup} onClose={() => { setTweeterTopup(false) }}>
                <TweeterTopupDialog />
            </Dialog>


        </div>
        <div className="topupDesign">
            <div className="pattern"></div>
        </div>
    </div>
}

export default TopUp;
