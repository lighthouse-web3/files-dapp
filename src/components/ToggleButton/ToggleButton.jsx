import React, { useEffect, useRef, useState } from 'react'
import './ToggleButton.scss'

function ToggleButton({ setIsEncrypted, isEncrypted }) {

    return (
        <div className="ToggleButton">
            <p className='title' dangerouslySetInnerHTML={{ __html: isEncrypted ? 'Encryption <br/> Mode' : 'Public <br/> Mode' }}></p>
            <label className="toggle" for="uniqueID">
                <input type="checkbox" className="toggle__input" id='uniqueID' onClick={(e) => { setIsEncrypted(e.target.checked) }} />
                <span className="toggle-track">
                    <span className="toggle-indicator">
                        <span className="checkMark">
                            <svg viewBox="0 0 30 30" width="12px" height="12px">
                                <g id="surface135374641">
                                    <path style={{
                                        stroke: 'none', fillRule: 'nonzero',
                                        fill: 'rgb(100%,100%,100%)', fillOpacity: '1'
                                    }} d="M 15 2 C 11.144531 2 8 5.144531 8 9 L 8 11 L 6 11 C 4.894531 11 4 11.894531 4 13 L 4 25 C 4 26.105469 4.894531 27 6 27 L 24 27 C 25.105469 27 26 26.105469 26 25 L 26 13 C 26 11.894531 25.105469 11 24 11 L 22 11 L 22 9 C 22 5.273438 19.035156 2.269531 15.355469 2.074219 C 15.242188 2.027344 15.121094 2.003906 15 2 Z M 15 4 C 17.773438 4 20 6.226562 20 9 L 20 11 L 10 11 L 10 9 C 10 6.226562 12.226562 4 15 4 Z M 15 4 " />
                                </g>
                            </svg>
                        </span>
                    </span>
                </span>
            </label>
        </div>
    )
}

export default ToggleButton