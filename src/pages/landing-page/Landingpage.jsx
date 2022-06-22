import React, { useEffect, useState } from "react";
import "./Landingpage.scss";
import { BsDiscord, BsFacebook, BsTwitter } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authAC } from "../../store/action-creators";
import axios from 'axios';
import { ethers } from "ethers";
import { login } from "../../utils/services/auth";
import { baseUrl } from "../../utils/config/urls";
import { getWeb3AuthProvider, web3auth } from "../../utils/services/web3auth";
import { AiOutlineLogin } from "react-icons/ai";


function Landingpage() {
    const dispatch = useDispatch();
    const _auth = bindActionCreators(authAC, dispatch);
    const _location = useLocation();


    const _currentAuth = useSelector((store) => store.auth);
    const [isW3AConnected, setw3AConnected] = useState(false);


    const loginWeb3Auth = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3provider = await getWeb3AuthProvider();
        const provider = new ethers.providers.Web3Provider(web3provider);

        const signer = provider.getSigner();
        let address = await signer.getAddress();
        const res = await axios.get(`${baseUrl}/api/auth/get_message?publicKey=${address}`);
        const message = res.data;
        const signed_message = await signer.signMessage(message);
        const obj = {
            signed_message: signed_message,
            address: await signer.getAddress()
        }
        const authToken = await axios.post(`${baseUrl}/api/auth/verify_signer`, {
            "publicKey": obj.address,
            "signedMessage": obj.signed_message
        });
        _auth.setAuthData(obj);
        login(obj.address, obj.signed_message, authToken?.['data']?.['accessToken']);
    };

    useEffect(() => {
        localStorage.getItem('reloadKey') ? localStorage.removeItem('reloadKey') : localStorage.setItem('reloadKey', '1');

        let isReloaded = localStorage.getItem('reloadKey');
        (isReloaded) && (_location?.state?.from === 'logout') && window.location.reload()

        return () => { }
    }, [])






    return (
        <div className="landingPage">
            <div className="landingPage__overlay"></div>
            <div className="landingPage__overlayRings"></div>
            <div className="landingPage__sideBar">
                <div className="header">
                    <img src="/logo.png" alt="" />
                    <p className="gradient__text">Lighthouse</p>
                </div>
                <div className="title">
                    <p>
                        Your <br /> <span className="gradient__text">Web 3.0</span>{" "}
                        storage
                        <br /> in <span className="gradient__text">Metaverse</span>
                    </p>


                </div>
                <div className="loginBox" onClick={loginWeb3Auth} >
                    <div className="loginBtn ptr" >
                        <AiOutlineLogin />
                        <p>Login</p>
                    </div>

                </div>
                <div className="footer">

                    <section>
                        <div className="footer__heading">
                            Supported Chains:
                        </div>

                        <div className="footer__chains">
                            <img src="/chain_icons/binance.png" alt="binanceLogo" />
                            <img src="/chain_icons/polygon.png" alt="polygonLogo" />
                            <img src="/chain_icons/fantom.png" alt="fantomLogo" />
                            <img src="/chain_icons/ethereum.png" alt="ethereum" />
                            <img src="/chain_icons/optimism.svg" alt="optimismLogo" />
                        </div>
                    </section>

                    <div className="footer__icons">
                        <a href="https://discord.com/invite/c4a4CGCdJG" target="_blank" rel="noreferrer"> <BsDiscord /></a>
                        <a href="https://twitter.com/lighthouseweb3" target="_blank" rel="noreferrer"> <BsTwitter /></a>
                    </div>


                </div>
            </div>
            <div className="landingPage__loginBar">
                <div className="landingPage__loginBar_pattern"></div>

                <div className="landingPage__loginBar_iconsContainer">
                    <div className="loginBox ptr" onClick={loginWeb3Auth}>
                        <div className="icon" style={{ fontSize: '2rem' }}>
                            <AiOutlineLogin />
                        </div>
                        <p>Login</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Landingpage;
