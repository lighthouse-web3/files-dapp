import React, { useEffect, useState } from "react";
import "./Landingpage.scss";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authAC } from "../../store/action-creators";
import { AiOutlineLogin } from "react-icons/ai";
import { Dialog } from "@material-ui/core";
import LoginDialog from "../../containers/LoginDialog/LoginDialog";


function Landingpage() {
    const dispatch = useDispatch();
    const _auth = bindActionCreators(authAC, dispatch);
    const _location = useLocation();


    const _currentAuth = useSelector((store) => store.auth);
    const [openLoginDialog, setLoginDialog] = useState(false);


    const loginWeb3Auth = async () => {
        setLoginDialog(true);
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
            <Dialog open={openLoginDialog} onClose={() => { setLoginDialog(false) }}>
                <LoginDialog setLoginDialog={setLoginDialog} />
            </Dialog>
        </div>
    );
}

export default Landingpage;
