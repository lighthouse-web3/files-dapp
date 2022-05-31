import React, { useEffect, useState } from 'react'
import { getCoinBalance } from '../../utils/services/transferUSDC'
import './TokenCard.scss'

function TokenCard({ name, contract, abb, logo }) {
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
        <div className="TokenCard">
            <div className="info">
                <img src={logo} alt="coinLogo" />
                <p className="name">{name}</p>
            </div>
            <div className="balance"> {(tokenBalance || 0)} {abb} </div>
        </div>
    )
}

export default TokenCard