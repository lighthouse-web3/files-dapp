import React, {
    useState
} from "react";
import "./header.scss";
import { CgProfile } from "react-icons/cg";
import ChainSelect from "../../components/chainSelect/ChainSelect";
import History from "../../utils/services/GlobalNavigation/navigationHistory";
import { AiOutlineCaretDown } from "react-icons/ai";
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown";



function Header() {


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
        </div>
    );
}

export default Header;
