import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Overlay from '../../../containers/Overlay/Overlay';
import { baseUrl } from '../../../utils/config/urls';
import { getAddress } from '../../../utils/services/auth';
import { notify } from '../../../utils/services/notification';
import { SendTransaction } from '../../../utils/services/transferUSDC';
import './Gateway.scss'
import { useMoralis, useWeb3Transfer } from "react-moralis";





const getData = async (setSubdomain) => {
    axios.get(`${baseUrl}/api/gateway/get_subdomain?publicKey=${getAddress()}`)
        .then(response => {
            console.log(response);
            setSubdomain(response?.subDomain || null)
        }, (error) => {

        });

}

const createGateway = async () => {
    SendTransaction()
    // console.log(Moralis.Moralis.Units.Token(20, 18));
    // console.log(Moralis);

    // const { fetch, error, isFetching } = Web3Transfer();
    // console.log(fetch, error, isFetching);
    // await transferUsdc();
    // if (value.length > 0) {
    //     axios.post(`${baseUrl}/api/gateway/add_subdomain`, {
    //         "publicKey": getAddress(),
    //         "subDomain": value,
    //         "signedMessage": getSignMessage()
    //     }).then((res) => {
    //         console.log(res);
    //     })

    // } else {
    //     notify('Enter Custom Gateway Domain', 'error')
    // }


}


function Gateway() {
    const [subdomain, setSubdomain] = useState(null);
    const inputRef = useRef(null)
    const { Moralis } = useMoralis();

    const params = {
        amount: Moralis.Units.Token(1, 18),
        receiver: "0x420B7C7114F7372207Ab0b36F1353B5d2D3b2afB",
        type: "erc20",
        contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    }
    console.log(params);

    const { fetch, error, isFetching } = useWeb3Transfer(params);

    useEffect(() => {
        getData(setSubdomain);
        return () => {
        }
    }, [])

    const MoralisTemp = async () => {
        // console.log(Moralis.Moralis.Units.Token(20, 18));
        // console.log(Moralis);
        // Moralis.authenticate();
        // const options = {
        //     type: "erc20",
        //     amount: Moralis.Moralis.Units.Token("0.5", "18"),
        //     receiver: "0x..",
        //     contractAddress: "0x..",
        // };
        // let result = await Moralis.Moralis.transfer(options);
    };

    return <div className="gateway">
        {/* <Overlay /> */}
        <div className="gateway__title">
            <p>Gateway</p>
        </div>

        <div className="gateway__content">
            <p>Add Subdoamin at lighthouse.storage</p>
            <input type="text" placeholder='Enter Subdomain' value={subdomain} ref={inputRef} />
            {/* {error && <p>
                Error - {error}
            </p>} */}
            <button className="btn" onClick={() => {
                createGateway()
                // createGateway(inputRef.current.value, Moralis, Web3Tra/nsfer)
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
