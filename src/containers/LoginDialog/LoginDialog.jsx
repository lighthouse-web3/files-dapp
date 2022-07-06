import { DialogContent } from '@material-ui/core'
import React, { useRef } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
// import { GrGoogle, GrFacebook, GrMail } from 'react-icons/gr'
import './LoginDialog.scss'
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { currentWeb3AuthChain, getWeb3AuthChainConfig, getWeb3AuthProvider, web3auth, web3AuthLogin, Web3AuthLoginWithWallet } from '../../utils/services/web3auth';
import { WALLET_ADAPTERS } from "@web3auth/base";
import { ethers } from 'ethers';
import axios from 'axios';
import { baseUrl } from '../../utils/config/urls';
import { login } from '../../utils/services/auth';


function LoginDialog() {
    const email = useRef('');
    const loginSocial = async (type) => {
        console.log(type);
        const web3provider = await web3AuthLogin(WALLET_ADAPTERS.OPENLOGIN, "google");
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
        login(obj.address, obj.signed_message);
    }
    const handleLoginWithEmail = async () => {
        const web3provider = await web3AuthLogin(WALLET_ADAPTERS.OPENLOGIN, "email_passwordless", email.current.value);
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
        login(obj.address, obj.signed_message);
    }
    const handleWallet = async () => {
        const web3provider = await Web3AuthLoginWithWallet();
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
        login(obj.address, obj.signed_message);
    }


    return (
        <div className="LoginDialog">
            <div className="LoginDialog__content">
                <DialogContent>
                    <div className="title">
                        <p >Login To Lighthouse</p>
                        <AiOutlineCloseCircle />
                    </div>

                    <div className="content">
                        <div className="email">
                            <label htmlFor="">
                                Using an Email
                            </label>
                            <input type="text" ref={email} />
                            <button
                                className="fillBtn__blue" onClick={() => { handleLoginWithEmail() }}>Continue with Email</button>
                        </div>

                        <div className="directLogin">
                            <label htmlFor="">
                                Or Using one of our following
                            </label>
                            <button className="fillBtn__blue" onClick={() => { handleWallet() }}>Continue with Metamask</button>
                            <button className="fillBtn__blue" onClick={() => { loginSocial("google") }}>Continue with Google</button>
                            <button className="fillBtn__blue" onClick={() => {
                                loginSocial("facebook")
                            }}>Continue with Facebook</button>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </div>
    )
}

export default LoginDialog