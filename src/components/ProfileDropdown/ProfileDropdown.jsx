import { Popover } from "react-tiny-popover";
import React, { useState } from "react";
import "./ProfileDropdown.scss";
import { CgProfile } from "react-icons/cg";
import { AiOutlineCaretDown } from "react-icons/ai";
import { getAddress } from "../../utils/services/auth";
import { copyToClipboard } from "../../utils/services/other";
import { MdOutlineContentCopy } from "react-icons/md";
import TokenCard from "../TokenCard/TokenCard";
import { stableCoinContractAddress } from "../../utils/config/stableCoins";

function ProfileDropdown() {

    const userId = getAddress();
    const stableCoins = stableCoinContractAddress;
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "left", "right"]}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={
                <div className="ProfileDropdown">
                    <div className="label">Public Address</div>
                    <div className="userName">
                        {userId
                            ? userId.substring(0, 4) +
                            "...." +
                            userId.substring(userId.length - 4)
                            : ""}

                        <div
                            className="icon"
                            onClick={() => {
                                copyToClipboard(getAddress());
                            }}
                        >
                            <MdOutlineContentCopy />
                        </div>
                    </div>

                    <div className="label">Available Token</div>
                    <div className="tokenContainer">

                        {stableCoins && stableCoins.map((coin, key) =>
                            <TokenCard {...coin} size={'small'} key={key} />
                        )}

                    </div>



                </div>}
        >
            <div
                className="ProfileDropdownBtn"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
                <CgProfile
                    onClick={() => {
                        History.navigate("/dashboard/profile");
                    }}
                />
                &nbsp;
                <span>|</span>&nbsp;
                <span className="userName">
                    {userId
                        ? userId.substring(0, 4) +
                        "...." +
                        userId.substring(userId.length - 4)
                        : ""}
                </span>
                <span className="dropdown">
                    <AiOutlineCaretDown />
                </span>
            </div>
        </Popover>
    );
}

export default ProfileDropdown;
