import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'
import './LoginDialog.scss'

function LoginDialog() {
    return (
        <div className="LoginDialog">
            <DialogContent>
                <p>Login To Lighthouse</p>
                <DialogContentText>
                    <div className="email">
                        <label htmlFor="">
                            Using an Email
                        </label>
                        <input type="text" />
                        <button className="loginBtn">Continue with email</button>
                    </div>

                    <div className="directLogin">
                        <p className="label">Or Using one of our following</p>
                        <button className="loginBtn">Continue with Web3Auth</button>
                        <button className="loginBtn">Continue with Github</button>
                        <button className="loginBtn">Continue with Google</button>
                    </div>
                </DialogContentText>
            </DialogContent>

        </div>
    )
}

export default LoginDialog