import React, { useState } from 'react'
import './TweeterTopupDialog.scss'
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { baseUrl } from '../../utils/config/urls';
import { getAddress } from '../../utils/services/auth';
import { notify } from '../../utils/services/notification';


const makeTweet = () => {
    let content = `Requesting 1GB Free storage capacity at Lighthouse for public address : ${getAddress()}`;
    window.open(`https://twitter.com/intent/tweet?url=${content}`, '_blank');
}

const verifyTweet = async (twitterLink, setTwitterLink, setTweeterTopup) => {
    console.log(twitterLink);
    let twitterID = twitterLink.split('/')?.[5] || null;
    try {
        if (twitterID) {
            let topupResponse = await fetch(`${baseUrl}/api/auth/tweet_recharge?publicKey=${getAddress()}&twitterID=${twitterID}`)
            console.log(topupResponse);
            if (topupResponse) {
                notify('Topup Sucess', 'success');
                setTwitterLink('');
                setTweeterTopup(false);
            }

        } else {
            notify('Invalid Link', 'error');
        }

    } catch (e) {
        console.log(e);
        notify('Invalid Tweet Content | Please Make sure to add the public address in the tweet', 'error')
    }

}

function TweeterTopupDialog({ setTweeterTopup }) {
    const [twitterLink, setTwitterLink] = useState('');
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
                        <input value={twitterLink} onChange={(e) => { setTwitterLink(e.target.value) }} type="text" />
                        <Button onClick={() => { verifyTweet(twitterLink, setTwitterLink, setTweeterTopup) }}>Verify</Button>
                    </div>


                </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>

        </>
    )
}

export default TweeterTopupDialog