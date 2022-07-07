import React, { useState } from "react";
import "./uploadcid.scss";
import lighthouse from "@lighthouse-web3/sdk";
import axios from "axios";
import { notify } from "../../utils/services/notification";
import { getChainNetwork } from "../../utils/services/chainNetwork";
import { currentWeb3AuthChain } from "../../utils/services/web3auth";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function UploadCID({ setUploadProgress, sign_message, execute_transaction, setCidDialog }) {
    const [fileName, setFileName] = useState("");
    const [CID, setCID] = useState("");

    const uploadFile = async () => {
    // setUploadProgress(10);
        let network = currentWeb3AuthChain;

        if (network) {
            try {
                const costRes = await axios.get(
                    `https://ipfs.io/api/v0/dag/stat?arg=${CID}&progress=true`
                );
                console.log(costRes);
                if (costRes["status"] !== 200) {
                    notify("CID doesnt exist", "error");
                    return;
                }
                const deploy = await lighthouse.addCid(fileName, CID);
                console.log(deploy)
                if (deploy) {
                    notify("File Added To Queue Successfully", "success");
                    setCidDialog(false);
                }
            } catch (e) {
                notify(`Error: ${e}`, "error");
                setUploadProgress(0);
            }
        } else { }
    };

    const UploadCID = () => {
        console.log(fileName, CID)
        if (fileName.length > 0 && CID.length > 0) {
      // console.log('Start Upload file')
            uploadFile();
        } else {
            fileName.length === 0 && notify("Please Enter File Name", "error");
            CID.length === 0 && notify("Please Enter CID", "error");
        }
    };

    return (
        <>
            <DialogTitle>{"Upload File Using CID"}</DialogTitle>
            <DialogContent>
        <div className="upload_cid">
                    <input
                        type="text"
                        placeholder="Enter CID | eg. QmNYeP41TMqN...........94b8nYHM"
                        onInput={(e) => {
                            setCID(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Enter File Name"
                        onInput={(e) => {
                            setFileName(e.target.value);
                        }}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <div className="ActionContainer">
                    <Button
                        className="btn"
                        onClick={() => {
                            UploadCID();
                        }}
                    >
                        Upload
                    </Button>

                </div>

            </DialogActions>
        </>
    );
}

export default UploadCID;
