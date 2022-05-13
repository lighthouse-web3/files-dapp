import React, { useState, useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CollectionSearch from '../../../components/CollectionSearch/CollectionSearch';
import Pagination from "../../../components/Pagination/Pagination";
import { nftAC } from '../../../store/action-creators';
import { getAddress } from '../../../utils/services/auth';
import ReactLoading from "react-loading";





import './Collection.scss'



function Collection() {
    const [collection, setCollection] = useState([]);
    const [orignalCollection, setOrignalCollection] = useState([]);
    const [responseReceived, setResponseReceived] = useState(false);

    const Web3Api = useMoralisWeb3Api()
    const userId = getAddress();
    const dispatch = useDispatch()
    const _nftAC = bindActionCreators(nftAC, dispatch);
    const navigate = useNavigate();


    async function getNFT() {
        const address = userId;
        const options = { chain: 'matic', address: address };
        let totalCollection = []
        try {
            const polygonNFTs = await Web3Api.account.getNFTs(options);
            const userEthNFTs = await Web3Api.account.getNFTs({ address: address });

            console.log(polygonNFTs, userEthNFTs);
            totalCollection = [...userEthNFTs.result, ...polygonNFTs.result];

        } catch (err) {
            setResponseReceived(true);
        }




        totalCollection.forEach(item => {
            let meta = JSON.parse(item?.metadata || '{}');
            meta['name'] && (item.metadata = meta)
        })
        _nftAC.setNFTData(totalCollection);
        setCollection(totalCollection);
        setOrignalCollection(totalCollection)
        setResponseReceived(true)
    }

    useEffect(() => {
        getNFT()
    }, [])

    return (
        <>
            {
                responseReceived ?
                    <div className="collection">

                        <div div className="collection__title" >
                            <p>My Collection</p>

                            <div className="collection__body">
                                <CollectionSearch orignal={orignalCollection} setCurrent={setCollection} />

                                <div className="collection__body_list">
                                    {
                                        collection?.length > 0 && (
                                            collection.map((item, i) =>
                                                <div key={i} className="nft_block ptr" onClick={() => { navigate(`/dashboard/viewNFT/${item?.block_number_minted}`) }}>
                                                    <img
                                                        src={item?.metadata?.image ? item?.metadata?.image : item?.metadata?.image_url || ''} alt="nftImage"
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null;
                                                            currentTarget.src = "/placeholder.jpg";
                                                        }}
                                                    />
                                                    <p className="title">{item?.name?.length > 0 ? item.name : item?.metadata?.name}</p>
                                                    <div className="infobar">
                                                        <div className="info">{`Block Number: ${item?.block_number_minted}`}</div>
                                                    </div>
                                                </div>
                                            )
                                        )

                                    }


                                </div>

                                {
                                    orignalCollection?.length > 0 && <Pagination orignalData={orignalCollection} setCurrentData={setCollection} itemsPerPage={4} />
                                }


                            </div>
                        </div >
                    </div >
                    : <div className="loadingContainer">
                        <ReactLoading type={'bubbles'} color={'#4452FE'} height={667} width={375} />
                    </div>
            }
        </>
    )






}

export default Collection