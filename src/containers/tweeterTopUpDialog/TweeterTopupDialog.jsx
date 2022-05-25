import React from 'react'
import './TweeterTopupDialog.scss'
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


const makeTweet = () => {
    let content = ``;
    window.open(`https://twitter.com/intent/tweet?url=${content}`, '_blank');
}

function TweeterTopupDialog() {
    return (
        <>
            <DialogTitle>{"Get 1GB Free Storage"}</DialogTitle>
            <DialogContent className='TweeterTopupContainer' >
                <DialogContentText>
                    <p>To request funds via Twitter,
                        <span className='messageLink' onClick={makeTweet}>make a tweet</span>  with your Ethereum address pasted into the contents (surrounding text doesn't matter).
                        <br />
                        <br />
                        Once posted, Please verify by entering the tweet link in the textbox below:
                    </p>

                    <div className="textContainer">
                        <input type="text" />
                        <Button>Verify</Button>
                    </div>


                </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>

        </>
    )
}

export default TweeterTopupDialog