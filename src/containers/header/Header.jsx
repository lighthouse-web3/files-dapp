import React from "react";
import "./header.scss";
import ChainSelect from "../../components/chainSelect/ChainSelect";
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown";
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { otherDataAC } from "../../store/action-creators";
import { CgClose } from "react-icons/cg";
import Skeleton from 'react-loading-skeleton'




function Header() {

    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const _otherData = bindActionCreators(otherDataAC, dispatch);


    return (
        <div className="header">
            <div className="header__logoBox">
                <img src="/logo.png" alt="" />
                <p className="gradient__text">Lighthouse</p>
            </div>
            <div className="header__chainBox">
                <div className="container">
                    <ChainSelect />
                </div>
            </div>
            <div className="header__infoBox ptr">
                <ProfileDropdown />
            </div>

            <div className="header__menuBox" onClick={() => {
                _otherData.setOtherData({ sidebarClosed: !store.otherData.sidebarClosed })
            }}>
                {
                    store.otherData.sidebarClosed ? <FiMenu /> : <CgClose />
                }

            </div>
        </div>
    );
}

export default Header;
