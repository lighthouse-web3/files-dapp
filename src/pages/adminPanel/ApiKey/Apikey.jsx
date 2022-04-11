import React, { useState, useEffect, useRef } from "react";
import "./Apikey.scss";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { notify } from "../../../utils/services/notification";
import ReactLoading from "react-loading";
import axios from "axios";
import { getAddress, getSignMessage } from "../../../utils/services/auth";
import { baseUrl } from "../../../utils/config/urls";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { otherDataAC } from "../../../store/action-creators";

function Apikey() {

    const [currentAPI, setCurrentAPI] = useState(null);
    const [keyVisible, setKeyVisible] = useState(false);
    const [responseReceived, setResponseReceived] = useState(true);
    const tableRef = useRef(null);

    const store = useSelector((store) => store);
    const dispatch = useDispatch()
    const _otherData = bindActionCreators(otherDataAC, dispatch);


    useEffect(() => {
        store?.otherData?.['apiKey']?.length > 0 ? setCurrentAPI(store?.otherData?.['apiKey']) : setCurrentAPI(null);
        console.log(store);
    }, []);



    const getData = async () => {
        setResponseReceived(false);
        axios.post(`${baseUrl}/api/auth/get_api_key`, {
            "publicKey": getAddress(),
            "signedMessage": getSignMessage()
        }).then(
                (response) => {
                    setCurrentAPI(response['data']);

                    let tempStore = store?.otherData || {};
                    tempStore['apiKey'] = response['data'];
                    _otherData.setOtherData(tempStore);
                    setResponseReceived(true);
                },
                (error) => {
                    setResponseReceived(true);
                 // console.log(error);
                }
        );
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        notify("Copied To Clipboard", "success");
    };
    return (
        <>
            {responseReceived ? (
                <div className="Apikey">
                    <div className="Apikey__title">
                        <p>API Keys</p>
                        <div className="searchBar">
                            <button onClick={() => { getData() }} className="fillBtn__blue ptr">
                                {
                                    currentAPI?.length ? 'Regenerate Key' : 'Generate Key'
                                }
                            </button>
                        </div>
                    </div>

                    <div className="Apikey__tableContainer" ref={tableRef}>
                        <table>
                            <thead>
                                <tr className="tableHead">
                                    <th>Key ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAPI?.length > 0 &&
                                    <tr
                                        className="ptr"
                                    >
                                        <td>
                                            <span className="cid">{
                                                keyVisible ?
                                                    currentAPI : `${currentAPI.replace(/./g, '*')}`
                                            }</span>
                                            &nbsp;
                                        </td>
                                        <td>
                                            <span
                                                className="icon"
                                                onClick={() => {
                                                    setKeyVisible(keyVisible ? false : true)
                                                }}
                                            >
                                                {
                                                    keyVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />
                                                }

                                            </span>
                                            &nbsp;
                                            <span
                                                className="icon"
                                                onClick={() => {
                                                    copyToClipboard(currentAPI);
                                                }}
                                            >
                                                <MdOutlineContentCopy />
                                            </span>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                    <div className="loadingContainer">
                    <ReactLoading
                        type={"bubbles"}
                        color={"#4452FE"}
                        height={667}
                        width={375}
                    />
                </div>
            )}
        </>
    );
}

export default Apikey;
