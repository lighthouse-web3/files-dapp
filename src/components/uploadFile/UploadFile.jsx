import React from 'react'
import './UploadFile.scss'

function UploadFile({ setUploadedFiles, setUploadedFolder }) {
    function getEventFile(e) {
        setUploadedFiles(e);
    };
    function getEventFolder(e) {
        setUploadedFolder(e);
    };

    function clickInput(uploadType) {
        uploadType === 'file' && document.getElementById('file').click();
        uploadType === 'folder' && document.getElementById('folder').click();
    }
    return (
        <div className="fileContainer">
            <input type="file" id='file' onChange={e => getEventFile(e)} hidden />
            <input onChange={e => getEventFolder(e)} directory="" webkitdirectory="" type="file" id='folder' hidden />
            <button className="fileBtn ptr" onClick={() => { clickInput('file') }}>Upload File </button>
            {/* <button className="fileBtn ptr" onClick={() => { clickInput('folder') }}>Upload Folder </button> */}
        </div >
    )
}

export default UploadFile