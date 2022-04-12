import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Overlay from '../../../containers/Overlay/Overlay';
import { baseUrl } from '../../../utils/config/urls';
import { getAddress, getSignMessage } from '../../../utils/services/auth';
import { notify } from '../../../utils/services/notification';
import { transferUsdc } from '../../../utils/services/transferUSDC';
import './Gateway.scss'


const getData = async (setSubdomain) => {
    axios.get(`${baseUrl}/api/gateway/get_subdomain?publicKey=${getAddress()}`)
        .then(response => {
            console.log(response);
            setSubdomain(response?.subDomain || null)
        }, (error) => {

        });

}

const createGateway = async (value) => {
    await transferUsdc();
    if (value.length > 0) {
        axios.post(`${baseUrl}/api/gateway/add_subdomain`, {
            "publicKey": getAddress(),
            "subDomain": value,
            "signedMessage": getSignMessage()
        }).then((res) => {
            console.log(res);
        })

    } else {
        notify('Enter Custom Gateway Domain', 'error')
    }


}


function Gateway() {
    const [subdomain, setSubdomain] = useState(null);
    const inputRef = useRef(null)

    useEffect(() => {
        getData(setSubdomain);

        return () => {
        }
    }, [])

    return <div className="gateway">
        <Overlay />
        <div className="gateway__title">
            <p>Gateway</p>
        </div>

        <div className="gateway__content">
            <p>Add Subdoamin at lighthouse.storage</p>
            <input type="text" placeholder='Enter Subdomain' value={subdomain} ref={inputRef} />
            <button className="btn" onClick={() => {
                createGateway(inputRef.current.value)
            }}>
                {
                    subdomain ? <span>
                        Update IPFS Gateway
                    </span> : <span>
                        Create IPFS Gateway
                    </span>

                }

            </button>
        </div>
    </div>;
}

export default Gateway;
