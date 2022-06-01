import React, { useEffect, useState } from 'react'
import { getCoinBalance } from '../../utils/services/transferUSDC'
import './TokenCard.scss'

function TokenCard({ name, contract, abb, logo, size }) {
    const [tokenBalance, setTokenBalance] = useState(0);
    useEffect(() => {
        let mounted = true;
        (async () => {
            const balance = await getCoinBalance(contract);
            console.log(balance);
            mounted && setTokenBalance(balance);
        })();
        return () => mounted = false;
    }, [])





    return (
        <div className="TokenCard" style={size === 'small' ? { width: '80%' } : {}} >
            <div className="info">
                <img src={logo} style={size === 'small' ? { width: '20px', height: '20px' } : {}} alt="coinLogo" />
                {
                    size !== 'small' && <p className="name">{name}</p>
                }
            </div>
            <div className="balance"> {(tokenBalance || 0)} {abb} </div>
        </div>
    )
}

export default TokenCard