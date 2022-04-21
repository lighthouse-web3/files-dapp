import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Overlay from '../../../containers/Overlay/Overlay';
import { baseUrl } from '../../../utils/config/urls';
import { getAddress, getSignMessage } from '../../../utils/services/auth';
import { notify } from '../../../utils/services/notification';
import { copyToClipboard } from '../../../utils/services/other';
import { SendTransaction } from '../../../utils/services/transferUSDC';
import './Gateway.scss'

import { GoThumbsdown, GoThumbsup } from 'react-icons/go';


const getData = async (setSubdomain, setInputTerm) => {
    axios.get(`${baseUrl}/api/gateway/get_subdomain?publicKey=${getAddress()}`)
        .then(response => {
            setSubdomain(response?.data || null)
            setInputTerm(response?.data || null)
        }, (error) => {
            setSubdomain('')
        });
}

const createGateway = async (value) => {
    SendTransaction().then((res) => {
        if (value.length > 0) {
            axios.post(`${baseUrl}/api/gateway/add_subdomain`, {
                "publicKey": getAddress(),
                "subDomain": value,
                "signedMessage": getSignMessage()
            }).then((res) => {
                console.log(res);
                notify('Custom Gateway Created', 'success');
            })

        } else {
            notify('Enter Custom Gateway Domain', 'error')
        }
    })
}

const checkSubdomain = async (value, setDomainAvailable) => {
    axios.get(`${baseUrl}/api/gateway/check_subdomain?subDomain=${value}`)
        .then(response => {
            console.log(response, 'check SUBDOMAIN');
            response['data'] === 'Exists' && setDomainAvailable(false)
        }, (error) => {
            setDomainAvailable(true)
        });
}


function Gateway() {
    const [subdomain, setSubdomain] = useState(null);
    const [inputTerm, setInputTerm] = useState('')
    const [domainAvailable, setDomainAvailable] = useState(null)

    useEffect(() => {
        setDomainAvailable(null);
        const delayDebounceFn = setTimeout(async () => {
            await checkSubdomain(inputTerm, setDomainAvailable);
        }, 2000)
        return () => clearTimeout(delayDebounceFn)
    }, [inputTerm]);

    useEffect(() => {
        getData(setSubdomain, setInputTerm);
        return () => {
        }
    }, []);
    return <div className="gateway">
        <div className="gatewayMain">
            <div className="gatewayMain__title">
            <p>Gateway</p>
        </div>
            <div className="gatewayMain__content">

                <p>
                    {
                        subdomain ? 'Your Custom Sub-Domain' : 'Enter your custom subdomain at lighthouse'
                    }
                </p>
                {/* <input type="text" placeholder='Enter Subdomain' value={inputTerm} onChange={(e) => setInputTerm(e.target.value)} /> */}

                <div class="input-box">
                    <span class="prefix">https://</span>
                    <input type="text" placeholder="Enter Sub-Domain" value={inputTerm} onChange={(e) => setInputTerm(e.target.value)} />
                    <span class="suffix">.lighthouse.storage</span>
                </div>

                {
                    (subdomain !== inputTerm && domainAvailable !== null) && <p className='availability'>
                        {domainAvailable ? `Sub-Domain Available` : `Sub-Domain Not Available`}&nbsp;
                        {domainAvailable ? <GoThumbsup /> : <GoThumbsdown />}
                    </p>

                }


                {
                    subdomain && (
                        <p className="subdomain">Your lighthouse sub-domain is &nbsp;
                            <span className='link' onClick={() => { copyToClipboard(subdomain + '.lighthouse.storage') }} >{`${subdomain}.lighthouse.storage`}</span>
                        </p>
                    )
                }
            <button className="btn" onClick={() => {
                    createGateway(inputTerm)
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
        </div>
        <div className="gatewayDesign">
            <div className="pattern"></div>
        </div>

    </div>;
}

export default Gateway;
