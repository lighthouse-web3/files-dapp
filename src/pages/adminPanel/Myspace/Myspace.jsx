import React, { useState, useEffect, useRef } from "react";
import "./Myspace.scss";
import { MdOutlineContentCopy } from 'react-icons/md';
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fileAC } from '../../../store/action-creators/index'
import { bindActionCreators } from "redux";
import axios from "axios";
import moment from 'moment';
import Searchbar from "../../../components/searchBar/Searchbar";
import Pagination from "../../../components/Pagination/Pagination";
import { notify } from "../../../utils/services/notification";
import { getAddress } from "../../../utils/services/auth";
import { getFileIcon } from "../../../utils/services/fileTypeIcons";
import ReactLoading from 'react-loading';
import { baseUrl } from "../../../utils/config/urls";
import { bytesToString, copyToClipboard } from "../../../utils/services/other";


function Myspace() {
    const [infoBarData, setInfoBarData] = useOutletContext();
    const [currentItems, setCurrentItems] = useState([]);
    const [orignalItems, setOrignalItems] = useState([]);
    const [itemsPerPage, setitemsPerPage] = useState(7);
    const [responseReceived, setResponseReceived] = useState(false);
    const [userBalance, setUserBalance] = useState(null);
    const tableRef = useRef(null)
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
        setitemsPerPage(Math.floor(tableHeight / coulumnHeight) - 2);
    }

    const getData = async () => {
        axios.get(`${baseUrl}/api/user/get_uploads?publicKey=${getAddress()}`)
            .then(response => {
             // console.log(response);
                if (response['status'] === 200) {
                    _fileAC.setFileData(response['data']);
                    setCurrentItems(response['data']);
                    setOrignalItems(response['data']);
                    setResponseReceived(true);
                    setTableItemsLength();
                }
            }, (error) => {
             // console.log(error);
                setResponseReceived(true);
            });

        setUserBalance(store['balance']);

    }





    return (
        <>
            {
                responseReceived ?  
                    <div className="mySpace">

            <div className="mySpace__title">
                <p>My Space</p>
                <div className="searchBar">
                    <Searchbar orignalItems={orignalItems} setCurrentItems={setCurrentItems} />
                </div>
            </div>

            <div className="mySpace__tableContainer" ref={tableRef}>
                <table>
                    <thead>
                        <tr className="tableHead">
                            <th>Name</th>
                            <th>CID</th>
                            <th>Size</th>
                            <th>Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(currentItems?.length > 0) && currentItems.map((item, i) =>
                            <tr key={i} className="ptr" onClick={() => { setInfoBarData(item) }}>
                                <td >{getFileIcon(item?.fileName)}&nbsp;{item?.fileName}</td>
                                <td>
                                    <span className="cid">{item.cid}</span>
                                    &nbsp;
                                    <span className="icon" onClick={() => { copyToClipboard(item.cid) }}><MdOutlineContentCopy /></span>
                                </td>
                                <td>{(item?.fileSizeInBytes / 1024).toFixed(1) + ' KB'}</td>
                                <td>{moment(item?.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mySpace__lowerContainer">
                <div className="sizeBar">

                                {
                                    userBalance && <p>Total Size : {bytesToString(userBalance['dataUsed'])} / {bytesToString(userBalance['dataLimit'])}</p>
                                }

                </div>
                <Pagination orignalData={orignalItems} setCurrentData={setCurrentItems} itemsPerPage={itemsPerPage} />

            </div>
                    </div> : <div className="loadingContainer">
                        <ReactLoading type={'bubbles'} color={'#4452FE'} height={667} width={375} />
                    </div>
            }

        </>

    );
}

export default Myspace;
