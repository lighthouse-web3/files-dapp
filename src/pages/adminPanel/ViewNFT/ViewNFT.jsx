import React, { useEffect, useState } from 'react'
import './ViewNFT.scss'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';


function ViewNFT() {
    const { id } = useParams();
    const [currentNFT, setCurrentNFT] = useState(null)

    const allNfts = useSelector((store) => store.nft);

    useEffect(() => {
      //console.log(allNfts);
        let currentNFT = allNfts.filter(nft => nft.block_number_minted === id);
        setCurrentNFT(currentNFT[0]);
    }, [])


    return (
        <div className="viewNFT">
            <div className="viewNFT__title">
                <p>{currentNFT?.name || ''}</p>
            </div>
            <div className="viewNFT__body">
                <div className="imageSection">
                    <img
                        src={currentNFT?.metadata?.image ? currentNFT?.metadata?.image : currentNFT?.metadata?.image_url || ''} alt="nftImage"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/placeholder.jpg";
                        }} />
                </div>
                <div className="infoSection">
                    <p className="title">{currentNFT?.metadata?.name || '-'}</p>
                    <p className="description">
                        {currentNFT?.metadata?.description || '-'}
                    </p>
                    <hr />

                    <div className="info">
                        <p>Owner ID:</p>
                        <p>{currentNFT?.owner_of || '-'}</p>
                    </div>
                    <div className="info">
                        <p>Synced At:</p>
                        <p>{currentNFT?.synced_at || '-'}</p>
                    </div>
                    <div className="info">
                        <p>Block Number Minted:</p>
                        <p>{currentNFT?.block_number_minted || '-'}</p>
                    </div>
                    <div className="info">
                        <p>Token Address:</p>
                        <p>{currentNFT?.token_address || '-'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewNFT