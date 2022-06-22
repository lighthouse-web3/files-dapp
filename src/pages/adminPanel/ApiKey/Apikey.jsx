import React, { useState, useEffect, useRef } from "react";
import "./Apikey.scss";

import { MdOutlineVisibilityOff, MdOutlineVisibility, MdFileDownload, MdOutlineContentCopy } from "react-icons/md";
import { notify } from "../../../utils/services/notification";
import ReactLoading from "react-loading";
import axios from "axios";
import { getAddress, getSignMessage } from "../../../utils/services/auth";
import { baseUrl } from "../../../utils/config/urls";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { otherDataAC } from "../../../store/action-creators";
import { getWeb3AuthProvider, web3auth } from '../../../utils/services/web3auth'
import { ethers } from "ethers";

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
        const web3provider = await getWeb3AuthProvider();
        const provider = new ethers.providers.Web3Provider(web3provider);
        const signer = provider.getSigner();
        const res = await axios.get(`${baseUrl}/api/auth/get_message?publicKey=${getAddress()}`);
        const message = res.data;
        const signed_message = await signer.signMessage(message);

        axios.post(`${baseUrl}/api/auth/get_api_key`, {
            "publicKey": getAddress(),
            "signedMessage": signed_message
        }, {
            headers: { Authorization: `Bearer${getAddress()} ${getSignMessage()}` }
        }).then(
                (response) => {
                    setCurrentAPI(response['data']);

                    let tempStore = store?.otherData || {};
                    tempStore['apiKey'] = response['data'];
                _otherData.setOtherData({ ...tempStore });
                    setResponseReceived(true);
                downloadFile(response['data']);
                notify('Key Generated : Download and save at secure location', 'success')
                },
                (error) => {
                    setResponseReceived(true);
                }
        );
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        notify("Copied To Clipboard", "success");
    };

    const downloadFile = (text) => {
        try {
            const element = document.createElement("a");
            const file = new Blob([text], {
                type: "text/plain"
            });
            element.href = URL.createObjectURL(file);
            element.download = "lighthouse_API_Key.txt";
            document.body.appendChild(element);
            element.click();

        } catch (err) {
            console.log(err)
        }
    }
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
                                            <span
                                                className="icon"
                                                onClick={() => {
                                                    downloadFile(currentAPI);
                                                }}
                                            >
                                                <MdFileDownload />
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
