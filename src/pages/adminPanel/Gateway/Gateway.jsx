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
import { MdContentCopy } from 'react-icons/md';


const getData = async (setSubdomain, setInputTerm) => {
    axios.get(`${baseUrl}/api/gateway/get_subdomain?publicKey=${getAddress()}`)
        .then(response => {
            setSubdomain(response?.data || null)
            setInputTerm(response?.data || null)
        }, (error) => {
            setSubdomain('')
        });
}

const createGateway = async (value, transaction) => {
    if (transaction) {
        axios.post(`${baseUrl}/api/gateway/add_subdomain`, {
            "publicKey": getAddress(),
            "subDomain": value,
            "signedMessage": getSignMessage()
        }).then((res) => {
            console.log(res);
            notify('Custom Gateway Created', 'success');
        })
    }
}

const createTransaction = async (value, setTxResponse, transaction) => {
    if (value.length > 0) {
        SendTransaction().then((res) => {
            if (res) {
                console.log(res);
                setTxResponse(res['hash'] || 'error')
                createGateway(value, transaction);
            }
        }, (err) => {
            notify(err, 'error')
        })

    } else {
        notify('Please Enter A valid Custom IPFS', 'error')
    }

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

const checkTransaction = async (setTransaction) => {
    axios.get(`${baseUrl}/api/gateway/get_transaction_details?publicKey=${getAddress()}`)
        .then(response => {
            setTransaction(response['data'] || null)
        }, (error) => {
            setTransaction(null)
        });

}

const checkFormat = (value) => {
    // check only numbers , letters and hyphens allowed 
    var regex = new RegExp("^[a-zA-Z]+[a-zA-Z0-9\\-]*$");
    console.log('REGEX', regex.test(value))
    return regex.test(value);
}


function Gateway() {
    const [subdomain, setSubdomain] = useState(null);
    const [inputTerm, setInputTerm] = useState('')
    const [isFormatError, setFormatError] = useState(false)
    const [domainAvailable, setDomainAvailable] = useState(null)
    const [txHash, setTxHash] = useState(null)
    const [transaction, setTransaction] = useState(null)

    useEffect(() => {
        console.log(inputTerm, isFormatError)
        setDomainAvailable(null);
        setFormatError(!checkFormat(inputTerm));
        const delayDebounceFn = setTimeout(async () => {
            !isFormatError && await checkSubdomain(inputTerm, setDomainAvailable);
        }, 20000)
        return () => clearTimeout(delayDebounceFn)
    }, [inputTerm]);

    useEffect(() => {
        getData(setSubdomain, setInputTerm);
        checkTransaction(setTransaction)
        setInterval(function () {
            (transaction === null) && checkTransaction(setTransaction)
        }, 10000)
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
                        subdomain ? 'Your Custom IPFS Gateway' : 'Enter your custom IPFS Gateway at lighthouse'
                    }
                </p>


                <div class="input-box">
                    <span class="prefix">https://</span>
                    <input type="text" placeholder="Enter Sub-Domain" value={inputTerm} onChange={(e) => setInputTerm(e.target.value)} />
                    <span class="suffix">.lighthouse.storage</span>
                </div>

                {
                    (subdomain !== inputTerm && domainAvailable !== null) && <p className='availability'>
                        {domainAvailable ? `Name Available` : `Name Not Available`}&nbsp;
                        {domainAvailable ? <GoThumbsup /> : <GoThumbsdown />}
                    </p>

                }
                {
                    (txHash) && <p className='availability'>
                        Transaction in Process <br />
                        {`Transaction Hash: ${txHash}`}&nbsp;
                        <span className='link' onClick={() => { copyToClipboard(txHash + '') }} ><MdContentCopy /></span>
                    </p>

                }
                {
                    (transaction) &&
                    <div className="transactionBox">
                        <p className="title">Transaction Available</p>

                        <table>
                            <tr>
                                <td>Chain</td>
                                <td>{transaction.network}</td>
                            </tr>
                            <tr>
                                <td>Transaction Hash</td>
                                <td>{transaction.txHash}</td>
                            </tr>
                            <tr>
                                <td>Amount</td>
                                <td>{transaction.value}</td>
                            </tr>
                        </table>

                    </div>


                }
                {
                    (isFormatError) && <p className='errorMsg'>
                        Subdomain can only contain Letters, Numbers and Hyphen/minus sign (-)
                    </p>

                }


                {
                    subdomain && (
                        <p className="subdomain">Your lighthouse Gateway is &nbsp;
                            <span className='link' onClick={() => { copyToClipboard(subdomain + '.lighthouse.storage') }} >{`${subdomain}.lighthouse.storage`}</span>
                        </p>
                    )
                }
                <button disabled={!!(subdomain !== inputTerm && domainAvailable !== null && domainAvailable) ? false : true} className="btn" onClick={() => {
                    transaction ? createGateway(inputTerm, transaction) :
                        createTransaction(inputTerm, setTxHash, transaction)
            }}>
                {
                    subdomain ? <span>
                        Update IPFS Gateway
                    </span> : <span>
                                Create IPFS Gateway ( 5 USDC )
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
