import React, { useState, useEffect } from "react";
import "./uploadNew.scss";
import { useSelector } from "react-redux";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { RiKeyboardLine } from "react-icons/ri";
import Progress from "react-progressbar";
import UploadCID from "../../../components/uploadCID/UploadCID";

import {
    sign_message,
    execute_transaction,
    uploadFile,
    uploadFolder,
    uploadEncryptedFile,
} from "../../../utils/services/filedeploy";
import { notify } from "../../../utils/services/notification";

import { Dialog } from "@material-ui/core";
import DisclaimerBar from "../../../components/DisclaimerBar/DisclaimerBar";
import { bytesToString } from "../../../utils/services/other";
import ToggleButton from "../../../components/ToggleButton/ToggleButton";

const GetTotalFolderSize = (fileArr) => {
    let total = 0;
    for (let index = 0; index < fileArr["length"]; index++) {
        total = total + fileArr[index]?.size;
    }
    return total;
};
const clickInput = (uploadType) => {
    uploadType === "file" && document.getElementById("file").click();
    uploadType === "folder" && document.getElementById("folder").click();
};

function UploadNew() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFolder, setUploadedFolder] = useState([]);
    const [fileUploadProgress, setUploadProgress] = useState(0);
    const [isCidDialog, setCidDialog] = useState(false);
    const [isDisclaimer, setIsDisclaimer] = useState(true);
    const [isEncrypted, setIsEncrypted] = useState(false);
    const _authDetails = useSelector((store) => store.auth);

    const getEventFile = (e) => {
        setUploadedFiles(e);
    };
    const getEventFolder = (e) => {
        setUploadedFolder(e);
    };

    useEffect(() => {
        isEncrypted && setIsDisclaimer(false);
    }, [isEncrypted]);

    useEffect(() => {
        if (uploadedFiles?.target?.files.length > 0) {
            setUploadProgress(5);
          isEncrypted
              ? uploadEncryptedFile(uploadedFiles, setUploadProgress, _authDetails)
              : uploadFile(uploadedFiles, setUploadProgress, _authDetails);
      }
  }, [uploadedFiles]);

    useEffect(() => {
        if (uploadedFolder?.target?.files.length > 0) {
          setUploadProgress(5);
          uploadFolder(uploadedFolder, setUploadProgress, _authDetails);
      }
  }, [uploadedFolder]);

    return (
        <div className="uploadNew">
            <div className="uploadNew__top">
                <div className="uploadNew__title">
                    <p>Upload New</p>
                  <ToggleButton
                      setIsEncrypted={setIsEncrypted}
                      isEncrypted={isEncrypted}
                  />
              </div>
              {isDisclaimer && (
                  <DisclaimerBar
                      title={"Disclaimer"}
                      content={
                          "Lighthouse currently deploys the files on public IPFS, uploading private files is not advisable"
                      }
                      setIsDisclaimer={setIsDisclaimer}
                  />
              )}
              <div className="uploadNew__content">
                  <div
                      className="fileCard"
                      onClick={() => {
                          clickInput("file");
                      }}
                  >
                      <div className="pattern"></div>
                      <div className="title">
                          <div className="icon">
                              <VscNewFile />
                          </div>
                          Upload File
                      </div>
                  </div>

                  {!isEncrypted && (
                      <div
                          className="fileCard"
                          onClick={() => {
                              clickInput("folder");
                          }}
                      >
                          <div className="pattern"></div>
                          <div className="title">
                              <div className="icon">
                                  <VscNewFolder />
                              </div>
                              Upload Folder
                          </div>
                      </div>
                  )}

                  {!isEncrypted && (
                      <div
                          className="fileCard"
                          onClick={() => {
                              setCidDialog(true);
                          }}
                      >
                          <div className="pattern"></div>
                          <div className="title">
                              <div className="icon">
                                  <RiKeyboardLine />
                              </div>
                              Upload CID
                          </div>
                      </div>
                  )}

                  <input
                      type="file"
                      id="file"
                      onChange={(e) => getEventFile(e)}
                      hidden
                  />
                  <input
                      onChange={(e) => getEventFolder(e)}
                      directory=""
                      webkitdirectory=""
                      type="file"
                      id="folder"
                      hidden
                  />
              </div>
          </div>

          {/* Dialog box */}
          <Dialog
              open={isCidDialog}
              onClose={() => {
                  setCidDialog(false);
              }}
          >
              <UploadCID
                  setUploadProgress={setUploadProgress}
                  sign_message={sign_message}
                  execute_transaction={execute_transaction}
                  notify={notify}
                  setCidDialog={setCidDialog}
              />
          </Dialog>

          {fileUploadProgress > 0 && (
              <div className="uploadNew__progressContainer">
                  {uploadedFiles?.target?.files.length > 0 && (
                      <div className="information">
                          <p>
                              {uploadedFiles?.target?.files[0]?.name}
                              {` (${fileUploadProgress}%)`}
                          </p>
                          <p>{bytesToString(uploadedFiles?.target?.files[0]?.size)}</p>
                      </div>
                  )}
                  {uploadedFolder?.target?.files.length > 0 && (
                      <div className="information">
                          <p>
                              {
                                  uploadedFolder?.target?.files[0]?.webkitRelativePath?.split(
                                      "/"
                                  )[0]
                              }
                          </p>
                          <p>
                              {(
                                  GetTotalFolderSize(uploadedFolder?.target?.files) / 1024
                              ).toFixed(1)}{" "}
                              Kb
                          </p>
                      </div>
                  )}
                  <Progress completed={fileUploadProgress} />
              </div>
          )}
      </div>
  );
}

export default UploadNew;
