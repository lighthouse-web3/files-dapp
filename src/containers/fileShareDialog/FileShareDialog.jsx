import React, { useState } from "react";
import "./FileShareDialog.scss";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Chips from "react-chips";
import emailjs from "emailjs-com";
import { notify } from "../../utils/services/notification";



const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const sendEmail = (emailIds, cid, setMailAddress) => {
    let message = {
        to_emails: emailIds.join(','),
        message: cid,
    };
    emailjs.send('service_wtwdhbv', 'template_osbkn86', message, 'user_sWuohBQz7vY1wvfFSbCDF')
        .then(function (response) {
         // console.log('SUCCESS!', response.status, response.text);
            if (response.status === 200) {
                notify('File Shared Successfully')
                setMailAddress([]);
            }
        }, function (error) {
         // console.log('FAILED...', error);
        });
};

const chipTheme = {
    chip: {
        cursor: "default",
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid lightgrey",
        padding: "0.3rem 0.7rem",
        margin: "0.5rem 0.3rem",
    },
};

function FileShareDialog({ shareDialogData, setShareDialogData }) {
 // console.log(shareDialogData);
    const [mailAddress, setMailAddress] = useState([]);
    const [isError, setError] = useState(false);

    function onChange(chips) {
        setError(false);
        let validatedChips = [];
        chips.forEach((element) => {
            if (validateEmail(element)) {
                validatedChips.push(element);
            } else {
                setError(true);
            }
        });
        setMailAddress(validatedChips);
    }
    return (
        <>
            <DialogTitle>{"Share File"}</DialogTitle>
            <DialogContent>
                <p>Share your file with anyone</p>

                {isError && <small>Please enter a valid email</small>}

                <DialogContentText>
                    <Chips
                        value={mailAddress}
                        onChange={onChange}
                        uniqueChips={true}
                        createChipKeys={[32, 188, 9, 13]}
                        chipTheme={chipTheme}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <p className="files">
                    Sharing this file with {mailAddress.length} Users
                </p>
                <Button onClick={() => { sendEmail(mailAddress, shareDialogData.cid, setMailAddress) }}>Share</Button>
            </DialogActions>

        </>
    );
}

export default FileShareDialog;
