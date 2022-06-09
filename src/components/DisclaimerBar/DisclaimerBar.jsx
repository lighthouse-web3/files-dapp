import React from 'react'
import './DisclaimerBar.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function DisclaimerBar({ title, content, setIsDisclaimer }) {
    return (
        <div className="DisclaimerBar">
            <div className="container">
                <div className="title">
                    <p>{title}</p>
                    <AiOutlineCloseCircle className='ptr' onClick={() => { setIsDisclaimer(false) }} />
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default DisclaimerBar