import React, { useEffect, useState } from "react";
import "./Landingpage.scss";
import { BsDiscord, BsFacebook, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authAC } from "../../store/action-creators";
import axios from 'axios';
import { ethers } from "ethers";
import { login } from "../../utils/services/auth";
import { baseUrl } from "../../utils/config/urls";
import { subscribeAuthEvents, web3auth } from "../../utils/services/web3auth";

function Landingpage() {
    const dispatch = useDispatch();
    const _auth = bindActionCreators(authAC, dispatch);
    const _currentAuth = useSelector((store) => store.auth);
    const [isW3AConnected, setw3AConnected] = useState(false);


    const loginWeb3Auth = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const web3provider = await web3auth.connect();
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

        _auth.setAuthData(obj);
        login(obj.address, obj.signed_message);
        return;
    };

    useEffect(() => {
        console.log(web3auth)
        return () => { }
    }, [])
    // useEffect(() => {
    //     loginWeb3Auth();
    //     return () => { }
    // }, [isW3AConnected])





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

                    <div className="icons">
                        <a href="https://discord.com/invite/c4a4CGCdJG" target="_blank" rel="noreferrer"> <BsDiscord /></a>
                        <a href="https://twitter.com/lighthouseweb3" target="_blank" rel="noreferrer"> <BsTwitter /></a>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer__heading">
                        Supported Chains:
                    </div>

                    <div className="footer__chains">
                        <img src="/chain_icons/binance.png" alt="binanceLogo" />
                        <img src="/chain_icons/polygon.png" alt="polygonLogo" />
                        <img src="/chain_icons/fantom.png" alt="fantomLogo" />
                        <img src="/chain_icons/optimism.svg" alt="optimismLogo" />
                    </div>

                </div>
            </div>
            <div className="landingPage__loginBar">
                <div className="landingPage__loginBar_pattern"></div>

                <div className="landingPage__loginBar_iconsContainer">
                    {/* <div className="loginBox ptr" onClick={() => sign_message(setUserAddress, _navigate)}>
                        <img src="/icons/metamask.png" alt="metamaskIcon" />
                        <p className="m-1">Metamask</p>
                    </div> */}
                    <div className="loginBox ptr" onClick={loginWeb3Auth}>
                    <img src="/icons/walletConnect.png" alt="walletConnect" />
                    <p>Wallet Connect</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landingpage;
