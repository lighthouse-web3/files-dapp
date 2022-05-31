import React, {
    useState, useEffect
} from "react";
import "./header.scss";
import { CgProfile } from "react-icons/cg";
import ChainSelect from "../../components/chainSelect/ChainSelect";
import { getCoinBalance } from '../../utils/services/transferUSDC';
import History from "../../utils/services/GlobalNavigation/navigationHistory";



function Header() {
    const _auth = JSON.parse(localStorage.getItem("authData") || "{}");
    const userId = _auth?.userAddress || "-";

    const [web3authProvider, setWeb3AuthProvider] = useState(null);





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
            <div className="header__infoBox">
                <CgProfile onClick={() => { History.navigate('/dashboard/profile') }} />
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
