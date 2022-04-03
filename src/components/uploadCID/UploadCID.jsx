import React, { useState } from 'react'
import './uploadcid.scss'
import lighthouse from "lighthouse-web3";
import axios from 'axios';
import { notify } from '../../utils/services/notification';
import { getChainNetwork } from '../../utils/services/chainNetwork';







function UploadCID({ setUploadProgress, sign_message, execute_transaction }) {

    const [fileName, setFileName] = useState('')
    const [CID, setCID] = useState('')

    const uploadFile = async () => {
        // setUploadProgress(10);
        let network = await getChainNetwork()

        if (network) {
            try {
                const signing_response = await sign_message();
              console.log(signing_response)
                // setUploadProgress(20);

                const costRes = await axios.get(`https://ipfs.io/api/v0/dag/stat?arg=${CID}&progress=true`);

                if (costRes['status'] !== 200) {
                    notify('CID doesnt exist', 'error');
                    return;
                }
                const cost = (await lighthouse.getQuote(costRes['data']['Size'], network)).total_cost.toFixed(18).toString();
                const transaction = await execute_transaction(CID, fileName, costRes['data']['Size'], cost, network);
                const deploy = await lighthouse.addCid(fileName, CID);

                if (deploy['created']) {
                    notify('File Uploaded Successfully', 'success');
                }

            }
            catch (e) {
                notify(`Error: ${e}`, 'error');
                setUploadProgress(0);
            }
        } else {
          console.log("Please connect to a supported network");
        }
    }






    const UploadCID = () => {
      console.log(fileName, CID)
        if (fileName.length > 0 && CID.length > 0) {
          console.log('Start Upload file')
            uploadFile()
        } else {
            fileName.length === 0 && notify('Please Enter File Name', 'error');
            CID.length === 0 && notify('Please Enter CID', 'error');
        }
    }


    return (
        <div className="upload_cid">
            <p>Add file using CID</p>
            <input type="text" placeholder='Enter CID | eg. QmNYeP41TMqN...........94b8nYHM' onInput={(e) => { setCID(e.target.value) }} />
            <input type="text" placeholder='Enter File Name' onInput={(e) => { setFileName(e.target.value) }} />
            <button className="btn" onClick={() => { UploadCID() }}>Upload</button>
        </div>
    )
}

export default UploadCID