import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../../../utils/config/urls';
import { getAddress, getSignMessage } from '../../../utils/services/auth';
import { notify } from '../../../utils/services/notification';
import { SendTransaction } from '../../../utils/services/transferUSDC';
import './TopUp.scss'


const getData = async (setSubdomain) => {
    axios.get(`${baseUrl}/api/gateway/get_subdomain?publicKey=${getAddress()}`)
        .then(response => {
            console.log(response);
            setSubdomain(response?.subDomain || null)
        }, (error) => {
        });
}

const createGateway = async (value) => {
    await SendTransaction()
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
}


function TopUp() {
    const [subdomain, setSubdomain] = useState(null);
    const inputRef = useRef(null)
    useEffect(() => {
        getData(setSubdomain);
        return () => {
        }
    }, [])
    return <div className="topup">
        {/* <Overlay /> */}
        <div className="topup__title">
            <p>Topup Lighthouse Storage</p>
        </div>

        <div className="topup__desctription">
            <p>Add Topup from our value added packages:</p>
        </div>

        <div className="topup__content">

            <div className="planCard">
                <p className="title">Plan Title</p>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aliquam debitis aliquid cumque, laboriosam soluta voluptatibus, accusantium beatae, facere vel ullam dolore officiis harum suscipit nihil voluptatum. Distinctio, dolorum at.</p>
                <p className="price">1 USDT</p>
            </div>
            <div className="planCard">
                <p className="title">Plan Title 2</p>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aliquam debitis aliquid cumque, laboriosam soluta voluptatibus, accusantium beatae, facere vel ullam dolore officiis harum suscipit nihil voluptatum. Distinctio, dolorum at.</p>
                <p className="price">2 USDT</p>
            </div>
            <div className="planCard">
                <p className="title">Plan Title 3</p>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aliquam debitis aliquid cumque, laboriosam soluta voluptatibus, accusantium beatae, facere vel ullam dolore officiis harum suscipit nihil voluptatum. Distinctio, dolorum at.</p>
                <p className="price">3 USDT</p>
            </div>


        </div>
    </div>;
}

export default TopUp;
