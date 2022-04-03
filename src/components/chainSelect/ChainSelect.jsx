import React, { useEffect, useState } from 'react'
import { Popover } from 'react-tiny-popover';
import './chainselect.scss'
import { changeNetwork, getChainNetwork } from "../../utils/services/chainNetwork";
import { AiOutlineCaretDown } from "react-icons/ai";

function ChainSelect() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentChain, setCurrentChain] = useState(false);

    useEffect(() => {
        window.ethereum.on("chainChanged", () => {
            window.location.reload();
        });
        return () => {
            window.ethereum.removeListener("chainChanged", () => { });
        };
    }, []);
    const handleNetworkSwitch = async (networkName) => {
        await changeNetwork({ networkName });
        setCurrentChain(await getChainNetwork());
    };

    useEffect(() => {
        (async () => {
            setCurrentChain(await getChainNetwork());
        })();
    }, [])

    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={['bottom', 'left', 'right']}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={<div className="chainsList">
                <div className="chainsList__chainItem" onClick={() => handleNetworkSwitch('fantom')}>
                    <img src="/chain_icons/fantom.png" alt="" />
                    <p>Fantom</p>
                </div>
                <div className="chainsList__chainItem" onClick={() => handleNetworkSwitch('polygon')}>
                    <img src="/chain_icons/polygon.png" alt="" />
                    <p>Polygon</p>
                </div>
                <div className="chainsList__chainItem" onClick={() => handleNetworkSwitch('optimism')}>
                    <img src="/chain_icons/optimism.png" alt="" />
                    <p>Optimism</p>
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
                    (currentChain === 'optimism' || currentChain === 'optimism-testnet') && <>
                        Optimism
                    </>
                }&nbsp; <AiOutlineCaretDown />
            </div>
        </Popover>
    )
}

export default ChainSelect