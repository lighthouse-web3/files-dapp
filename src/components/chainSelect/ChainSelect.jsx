import React, { useEffect, useState } from 'react'
import { Popover } from 'react-tiny-popover';
import './chainselect.scss'
import { changeNetwork, getChainNetwork } from "../../utils/services/chainNetwork";
import { AiOutlineCaretDown } from "react-icons/ai";
import { changeWeb3AuthChain, currentWeb3AuthChain, web3auth } from '../../utils/services/web3auth';
import { ethers } from 'ethers';

function ChainSelect() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [currentChain, setCurrentChain] = useState(false);

    useEffect(() => {
        // window.ethereum.on("chainChanged", () => {
        //     window.location.reload();
        // });
        // return () => {
        //     window.ethereum.removeListener("chainChanged", () => { });
        // };
        setCurrentChain(currentWeb3AuthChain);
    }, []);
    // const handleNetworkSwitch = async (networkName) => {
    //     await changeNetwork({ networkName });
    //     setCurrentChain(await getChainNetwork());
    // };
    const handleNetworkSwitch = async (networkName) => {
        changeWeb3AuthChain(networkName);
        setCurrentChain(currentWeb3AuthChain);
        // web3auth
        console.log(web3auth);
        const provider = new ethers.providers.Web3Provider(await web3auth.connect());

        console.log(provider);
    };

    // useEffect(() => {
    //     (async () => {
    //         setCurrentChain(await getChainNetwork());
    //     })();
    // }, [])

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
                <div className="chainsList__chainItem" onClick={() => handleNetworkSwitch('ethereum')}>
                    <img src="/chain_icons/ethereum.png" alt="" />
                    <p>Ethereum</p>
                </div>
                <div className="chainsList__chainItem" onClick={() => handleNetworkSwitch('binance')}>
                    <img src="/chain_icons/binance.png" alt="" />
                    <p>Binance</p>
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
                    (currentChain === 'binance' || currentChain === 'binance-testnet') && <>
                        Binance
                    </>
                }
                {
                    (currentChain === 'ethereum' || currentChain === 'etherem-testnet') && <>
                        Ethereum
                    </>
                }
                {
                    (currentChain === 'optimism' || currentChain === 'optimism-testnet') && <>
                        Optimism
                    </>
                }
                {
                    (currentChain === null) && <>
                        Change Network
                    </>
                }
                &nbsp; <AiOutlineCaretDown />
            </div>
        </Popover>
    )
}

export default ChainSelect