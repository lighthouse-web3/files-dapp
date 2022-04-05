import React, { useState, useEffect, useRef } from "react";
import "./Apikey.scss";
import { MdOutlineContentCopy } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import { notify } from "../../../utils/services/notification";
import ReactLoading from "react-loading";
import axios from "axios";
import { getAddress, getSignMessage } from "../../../utils/services/auth";

function Apikey() {
    const [infoBarData, setInfoBarData] = useOutletContext();
    const [currentAPI, setCurrentAPI] = useState(['']);
    const [responseReceived, setResponseReceived] = useState(false);
    const tableRef = useRef(null);


    useEffect(() => {
        getData();
        window.ethereum.on("chainChanged", () => {
            getData();
        });
        return () => {
            window.ethereum.removeListener("chainChanged", () => { });
        };
    }, []);



    const getData = async () => {
        axios
            .get(
                `https://api.lighthouse.storage/api/lighthouse/get_api_key?publicKey=${getAddress()}&signed_message=${getSignMessage()}`
            )
            .then(
                (response) => {
                    // console.log(response);
                    setCurrentAPI([response['data']]);
                    setResponseReceived(true);
                },
                (error) => {
                    setResponseReceived(true);
                    console.log(error);
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
                            <button onClick={() => { getData() }} className="fillBtn__blue ptr">New Key</button>
                        </div>
                    </div>

                    <div className="Apikey__tableContainer" ref={tableRef}>
                        <table>
                            <thead>
                                <tr className="tableHead">
                                    {/* <th>Name</th> */}
                                    <th>Key ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAPI?.length > 0 &&
                                    currentAPI.map((item, i) => (
                                        <tr
                                            key={i}
                                            className="ptr"
                                            onClick={() => {
                                                setInfoBarData(item);
                                            }}
                                        >
                                            <td>
                                                <span className="cid">{item}</span>
                                                &nbsp;
                                            </td>
                                            <td>
                                                <span
                                                    className="icon"
                                                    onClick={() => {
                                                        copyToClipboard(item);
                                                    }}
                                                >
                                                    <MdOutlineContentCopy />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="Apikey__lowerContainer">
                      <Pagination
                          orignalData={orignalItems}
                          setCurrentData={setCurrentItems}
                          itemsPerPage={itemsPerPage}
                      />
                  </div> */}
                </div>
            ) : (
                <div className="Apikey_loading">
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
