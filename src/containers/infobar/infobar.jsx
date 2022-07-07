import React, { useEffect, useState } from 'react';
import './infobar.scss';
import {
    ProSidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
} from "react-pro-sidebar";
import { BiDownload, BiLink } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';
import { MdOutlineVisibility, MdClose } from 'react-icons/md';
import Dialog from "@material-ui/core/Dialog";
import FileShareDialog from '../fileShareDialog/FileShareDialog';
import moment from 'moment';
import { notify } from '../../utils/services/notification';
import History from '../../utils/services/GlobalNavigation/navigationHistory';



function viewFile(data) {
    History.navigate(`viewFile/${data?.cid}`, { state: data })

}
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(`https://ipfs.io/ipfs/${text}`);
    notify('Copied To Clipboard', 'success')
}
function downloadFile(cid, filename) {
    let url = `https://ipfs.io/ipfs/${cid}`
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        })
        .catch(console.error);
}


function Infobar({ infoBarData, setInfoBarData }) {
    const [shareDialogData, setShareDialogData] = useState(null);
    return (
        <ProSidebar className='infoBarContainer' collapsed={infoBarData?.cid ? false : true}>
            <div className="bg-overlay"></div>
            <SidebarHeader>
                <p className='fileName'>{infoBarData?.fileName}</p>
                <MdClose className='ptr' onClick={() => { setInfoBarData(null) }} />
            </SidebarHeader>
            <SidebarContent>
                <div className="row">
                    <p>Size</p>
                    <p className='content'>{(infoBarData?.fileSizeInBytes / 1024).toFixed(1) + ' KB'}</p>
                </div>
                <div className="row">
                    <p>Created At</p>
                    <p className='content'>{moment(infoBarData?.createdAt).format("DD-MM-YYYY")} <br /> {moment(infoBarData?.createdAt).format("h:mm:ss")}</p>
                </div>
                <div className="row">
                    <p>CID
                        <br />
                        <span className="content">
                            {infoBarData?.cid}
                        </span>
                    </p>

                </div>

                <hr />

                <div className="iconsContainer">
                    <MdOutlineVisibility onClick={() => viewFile(infoBarData)} />
                    <BiLink onClick={() => {
                        copyToClipboard(infoBarData?.cid)
                    }} />
                    <BsShare onClick={() => {
                        setShareDialogData(infoBarData)
                    }} />
                    <BiDownload onClick={() => downloadFile(infoBarData?.cid, infoBarData?.cid)} />
                </div>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>

            <Dialog open={shareDialogData != null ? true : false} onClose={() => { setShareDialogData(null) }}>
                <FileShareDialog shareDialogData={shareDialogData} setShareDialogData={setShareDialogData} />
            </Dialog>
        </ProSidebar>)
}

export default Infobar;
