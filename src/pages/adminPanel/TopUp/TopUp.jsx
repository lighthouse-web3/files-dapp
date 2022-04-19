import axios from 'axios';
import React, { useRef, useState } from 'react';
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
    const inputRef = useRef(null)

    return <div className="topup">
        {/* <Overlay /> */}
        <div className="topup__title">
            <p>Topup Lighthouse Storage</p>
        </div>

        <div className="topup__description">
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

        <div className="topup__content">

            <input type="number" placeholder='Enter Topup Amount (USDC)' ref={inputRef} onChange={() => { calculateStorage(inputRef.current.value, setTopupStorage) }} />

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
    </div>
}

export default TopUp;
