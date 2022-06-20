import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './LoginDialog.scss'
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { currentWeb3AuthChain, getWeb3AuthChainConfig } from '../../utils/services/web3auth';

let clientId = process.env.REACT_APP_WEB3AUTH_APP_ID;


function LoginDialog() {
    const options = {
        chainConfig: getWeb3AuthChainConfig(currentWeb3AuthChain),
        authMode: "DAPP",
        clientId: clientId,
    }
    const web3auth = new Web3AuthCore(options);


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
                            <input type="text" />
                            <button className="fillBtn__blue">Continue with email</button>
                        </div>

                        <div className="directLogin">
                            <label htmlFor="">
                                Or Using one of our following
                            </label>
                            <button className="fillBtn__blue">Continue with Web3Auth</button>
                            <button className="fillBtn__blue">Continue with Github</button>
                            <button className="fillBtn__blue">Continue with Google</button>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </div>
    )
}

export default LoginDialog