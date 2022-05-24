import React from 'react'
import './TweeterTopupDialog.scss'
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

function TweeterTopupDialog() {
    return (
        <>
            <DialogTitle>{"Get 1GB Free Storage"}</DialogTitle>
            <DialogContent>
                <p>To request funds via Twitter, make a tweet with your Ethereum address pasted into the contents (surrounding text doesn't matter).</p>
                <DialogContentText>

                </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>

        </>
    )
}

export default TweeterTopupDialog