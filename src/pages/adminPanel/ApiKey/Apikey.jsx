import React, { useState, useEffect, useRef } from "react";
import "./Apikey.scss";
import { MdOutlineContentCopy, MdOutlineDelete } from 'react-icons/md';
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fileAC } from '../../../store/action-creators/index'
import { bindActionCreators } from "redux";
import Pagination from "../../../components/Pagination/Pagination";
import { notify } from "../../../utils/services/notification";
import ReactLoading from 'react-loading';


function Apikey() {
    const [infoBarData, setInfoBarData] = useOutletContext();
    const [currentItems, setCurrentItems] = useState([1, 1]);
    const [orignalItems, setOrignalItems] = useState([1, 1]);
    const [itemsPerPage, setitemsPerPage] = useState(7);
    const [responseReceived, setResponseReceived] = useState(true);
    const tableRef = useRef(null)
    const [totalSize, setTotalSize] = useState('0 kb');
    const store = useSelector((store) => store);
    const dispatch = useDispatch()
    const _fileAC = bindActionCreators(fileAC, dispatch);



    useEffect(() => {
        getData()
        window.ethereum.on("chainChanged", () => {
            getData()
        });
        return () => {
            window.ethereum.removeListener("chainChanged", () => { });
        };
    }, []);

    const setTableItemsLength = () => {
        let tableHeight = tableRef?.current?.clientHeight || 0;
        let coulumnHeight = 52;
        console.log(Math.floor(tableHeight / coulumnHeight) - 2)
        setitemsPerPage(Math.floor(tableHeight / coulumnHeight) - 2);
    }

    const getData = async () => {

    }



    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        notify('Copied To Clipboard', 'success')
    }
    return (
        <>
            {
                responseReceived ?
                    <div className="Apikey">

                        <div className="Apikey__title">
                            <p>API Keys</p>
                            <div className="searchBar">
                                <button className="fillBtn__blue">New Key</button>

                            </div>
                        </div>

                        <div className="Apikey__tableContainer" ref={tableRef}>
                            <table>
                                <thead>
                                    <tr className="tableHead">
                                        <th>Name</th>
                                        <th>Key</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(currentItems?.length > 0) && currentItems.map((item, i) =>
                                        <tr key={i} className="ptr" onClick={() => { setInfoBarData(item) }}>
                                            <td >Key Name</td>
                                            <td>
                                                <span className="cid">{'iu782989jj9292i0..'}</span>
                                                &nbsp;
                                                <span className="icon" onClick={() => { copyToClipboard('key') }}><MdOutlineContentCopy /></span>
                                            </td>
                                            <td><MdOutlineDelete /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="Apikey__lowerContainer">
                            <Pagination orignalData={orignalItems} setCurrentData={setCurrentItems} itemsPerPage={itemsPerPage} />

                        </div>
                    </div> : <div className="Apikey_loading">
                        <ReactLoading type={'bubbles'} color={'#4452FE'} height={667} width={375} />
                    </div>
            }

        </>

    );
}

export default Apikey;
