import React, { useEffect, useState } from "react";
import "./Landingpage.scss";
import { BsDiscord, BsFacebook, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authAC } from "../../store/action-creators";
import axios from 'axios';
import { ethers } from "ethers";
import { notify } from "../../utils/services/notification";
import { login } from "../../utils/services/auth";
import { baseUrl } from "../../utils/config/urls";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";


console.log('sss');

let clientId = process.env.REACT_APP_WEB3AUTH_APP_ID;
console.log(clientId);



// -------------------------------


function isMobileDevice() {
    return "ontouchstart" in window || "onmsgesturechange" in window;
}


const sign_message = async (setUserAddress, _navigate) => {
    if (!window.ethereum) {
        notify('Metamask Missing - Please Install Metamask', 'error');
        return;
    } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        let address = await signer.getAddress();
        const res = await axios.get(`${baseUrl}/api/auth/get_message?publicKey=${address}`);
        const message = res.data;
        const signed_message = await signer.signMessage(message);
        const obj = {
            message: message,
            signed_message: signed_message,
            address: await signer.getAddress()
        }
        setUserAddress(obj.address);
        login(obj.address, signed_message, _navigate);
        return;
    }
}



function Landingpage() {
    const _navigate = useNavigate();
    const dispatch = useDispatch();
    const _auth = bindActionCreators(authAC, dispatch);
    const [userAddress, setUserAddress] = useState("");
    const _currentAuth = useSelector((store) => store.auth);
    const [web3auth, setWeb3auth] = useState(null);
    const [provider, setProvider] = useState(null);

    const loginWeb3Auth = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const provider = await web3auth.connect();
        setProvider(provider);
    };



    useEffect(() => {
        console.log(clientId, 'ENV')
        const init = async () => {
            try {
                const initParams = {}

                const web3AuthCtorParams = {
                    clientId,
                    chainConfig: { chainNamespace: "eip155", chainId: "0x1" }
                }


                const web3auth = new Web3Auth(web3AuthCtorParams);
                const openloginAdapter = new OpenloginAdapter({
                    adapterSettings: {
                        clientId,
                        network: "testnet",
                        uxMode: "redirect",
                    },
                });
                web3auth.configureAdapter(openloginAdapter); web3auth.configureAdapter(openloginAdapter);
                subscribeAuthEvents(web3auth);
                setWeb3auth(web3auth);
                await web3auth.initModal(initParams);
            } catch (error) {
                console.error(error);
            }
        };

        const subscribeAuthEvents = (web3auth) => {
            // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
            web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
                console.log("Yeah!, you are successfully logged in", data);
                setProvider(web3auth.provider);
            });

            web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
                console.log("connecting");
            });

            web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                console.log("disconnected");
            });

            web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.error("some error or user has cancelled login request", error);
            });
        };

        init();
    }, []);

    useEffect(() => {
        console.log('enter')
        if (userAddress.length > 0) {
            let networkVersion = window.ethereum.networkVersion;
            _auth.setAuthData({
                address: userAddress,
                networkVersion: networkVersion,
            });

        }
    }, [_auth, _navigate, userAddress]);

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
                        {/* <img src="/chain_icons/binance.png" alt="binanceLogo" /> */}
                        <img src="/chain_icons/polygon.png" alt="polygonLogo" />
                        <img src="/chain_icons/fantom.png" alt="fantomLogo" />
                        <img src="/chain_icons/optimism.svg" alt="optimismLogo" />
                    </div>

                </div>
            </div>
            <div className="landingPage__loginBar">
                <div className="landingPage__loginBar_pattern"></div>

                <div className="landingPage__loginBar_iconsContainer">
                    <div className="loginBox ptr" onClick={() => sign_message(setUserAddress, _navigate)}>
                        <img src="/icons/metamask.png" alt="metamaskIcon" />
                        <p className="m-1">Metamask</p>
                    </div>
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
