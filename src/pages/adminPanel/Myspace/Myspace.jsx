import React, { useState, useEffect, useRef } from "react";
import "./Myspace.scss";
import { MdOutlineContentCopy, MdOutlineVisibility } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fileAC } from "../../../store/action-creators/index";
import { bindActionCreators } from "redux";
import axios from "axios";
import moment from "moment";
import Searchbar from "../../../components/searchBar/Searchbar";
import Pagination from "../../../components/Pagination/Pagination";
import { notify } from "../../../utils/services/notification";
import { getAddress } from "../../../utils/services/auth";
import { getFileIcon } from "../../../utils/services/fileTypeIcons";
import ReactLoading from "react-loading";
import { baseUrl } from "../../../utils/config/urls";
import { bytesToString, copyToClipboard } from "../../../utils/services/other";
import Skeleton from "react-loading-skeleton";

function Myspace() {
    const [infoBarData, setInfoBarData] = useOutletContext();
    const [currentItems, setCurrentItems] = useState([]);
    const [orignalItems, setOrignalItems] = useState([]);
    const [itemsPerPage, setitemsPerPage] = useState(7);
    const [responseReceived, setResponseReceived] = useState(false);
    const [userBalance, setUserBalance] = useState(null);
    const tableRef = useRef(null);
    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    const _fileAC = bindActionCreators(fileAC, dispatch);
    const isMobile = store?.otherData?.isMobile || false;

    useEffect(() => {
        getData();
    }, []);

    const setTableItemsLength = () => {
        let tableHeight = tableRef?.current?.clientHeight || 0;
        let coulumnHeight = 52;
        setitemsPerPage(Math.floor(tableHeight / coulumnHeight) - 2);
  };

    const getData = async () => {
        axios.get(`${baseUrl}/api/user/get_uploads?publicKey=${getAddress()}`).then(
            (response) => {
                if (response["status"] === 200) {
                    _fileAC.setFileData(response["data"]);
                    setCurrentItems(response["data"]);
                    setOrignalItems(response["data"]);
                    setResponseReceived(true);
                    setTableItemsLength();
                }
            },
            (error) => {
                setResponseReceived(true);
      }
    );

      setUserBalance(store["balance"]);
  };

    return (
        <>
            <div className="mySpace">
                <div className="mySpace__title">
                    <p>My Space</p>
                    <div className="searchBar">
                        <Searchbar
                            orignalItems={orignalItems}
                            setCurrentItems={setCurrentItems}
                        />
                    </div>
                </div>

                <div className="mySpace__tableContainer" ref={tableRef}>
                    <table>
                        <thead>
                            <tr className="tableHead">
                                <th>Name</th>
                                {!isMobile ? (
                                    <>
                                        <th>CID</th>
                                        <th>Size</th>
                                        <th>Last Modified</th>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {responseReceived ? (
                                currentItems?.length > 0 &&
                                currentItems.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="ptr"
                                        onClick={() => {
                                            setInfoBarData(item);
                                        }}
                                    >
                                        <td>
                                            {getFileIcon(item?.fileName)}&nbsp;{item?.fileName}
                                        </td>

                                        {isMobile ? (
                                            <></>
                                        ) : (
                                            <>
                                                <td>
                                                    <span className="cid">{item.cid}</span>
                                                    &nbsp;
                                                    <span
                                                        className="icon"
                                                        onClick={() => {
                                                            copyToClipboard(item.cid);
                                                        }}
                                                    >
                                                        <MdOutlineContentCopy />
                                                    </span>
                                                </td>
                                                <td>{bytesToString(item?.fileSizeInBytes)}</td>
                                                <td>
                                                    {moment(item?.createdAt).format("DD-MM-YYYY h:mm:ss")}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td><Skeleton /></td>
                                    {isMobile ? (
                                        <></>
                                    ) : (
                                        <>
                                            <td>
                                                <span style={{ flex: '0.95' }}>
                                                    <Skeleton />
                                                </span>
                                                    </td>
                                                    <td><Skeleton /></td>
                                                    <td><Skeleton /></td>
                                            </>
                                        )}
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mySpace__lowerContainer">
                    <div className="sizeBar">
                        {userBalance && (
                            <p>
                                Total Size : {bytesToString(userBalance["dataUsed"]) || <Skeleton />} /{" "}
                                {bytesToString(userBalance["dataLimit"]) || <Skeleton />}
                            </p>
                        )}
                    </div>
                    <Pagination
                        orignalData={orignalItems}
                        setCurrentData={setCurrentItems}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
      </>
  );
}

export default Myspace;
