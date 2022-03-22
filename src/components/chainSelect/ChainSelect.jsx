import React, { useEffect, useState } from 'react'
import { Popover } from 'react-tiny-popover';
import './chainselect.scss'
import { getChainNetwork } from "../../utils/services/chainNetwork";
import { AiOutlineCaretDown } from "react-icons/ai";

function ChainSelect() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentChain, setCurrentChain] = useState(false);

    useEffect(() => {
        setCurrentChain(getChainNetwork());
    }, [])

    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={['bottom', 'left', 'right']}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={<div className="chainsList">
                <div className="chainsList__chainItem">
                    <img src="/chain_icons/fantom.png" alt="" />
                    <p>Fantom</p>
                </div>
                <div className="chainsList__chainItem">
                    <img src="/chain_icons/polygon.png" alt="" />
                    <p>Polygon</p>
                </div>
                <div className="chainsList__chainItem">
                    <img src="/chain_icons/optimism.svg" alt="" />
                </div>
            </div>}
        >
            <div className='popoverBtn' onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                {
                    (currentChain === 'fantom' || currentChain === 'fantom-testnet') && <>
                        Fantom
                    </>
                }
                {
                    (currentChain === 'polygon' || currentChain === 'polygon-testnet') && <>
                        Polygon
                    </>
                }
                {
                    (currentChain === 'polygon' || currentChain === 'polygon-testnet') && <>
                        Polygon
                    </>
                }&nbsp; <AiOutlineCaretDown />
            </div>
        </Popover>
    )
}

export default ChainSelect