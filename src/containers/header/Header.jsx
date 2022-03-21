import React, { useState } from "react";
import "./header.scss";
import { CgProfile } from "react-icons/cg";
import { Popover } from "react-tiny-popover";
import ChainSelect from "../../components/chainSelect/ChainSelect";

function Header() {
    const _auth = JSON.parse(localStorage.getItem("authData") || "{}");
    const userId = _auth?.userAddress || "-";
    return (
        <div className="header">
            <div className="header__logoBox">
                <img src="/logo.png" alt="" />
                <p className="gradient__text">Lighthouse</p>
            </div>
            <div className="header__chainBox">
                <ChainSelect />
            </div>
            <div className="header__infoBox">
                <CgProfile />
                &nbsp;
                <span>|</span>&nbsp;
                <span className="userName">
                    {userId
                        ? userId.substring(0, 4) +
                        "...." +
                        userId.substring(userId.length - 4)
                        : ""}
                </span>
            </div>
        </div>
    );
}

export default Header;
