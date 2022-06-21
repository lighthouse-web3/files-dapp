import React from 'react'
import './UnderMaintenance.scss'
import TypeAnimation from 'react-type-animation';


function UnderMaintenance() {
    return (
        <div className="UnderMaintenance">
            <div className="bg_pattern"></div>
            <div className="logoContainer">
                <img src="/icons/logo.png" width={100} height={100} alt="" />
            </div>
            <div className="title">
                <p className='gradient__text title__text'>Lighthouse.storage</p>
                <TypeAnimation
                    cursor={true}
                    className='typeAnimation'
                    sequence={[
                        'Site Under Maintenance',
                        3000,
                    ]}
                    wrapper="a"
                    repeat={Infinity}
                />
            </div>

            {/* <div className="goBack ptr">
                <a href="/">Go Back</a>
            </div> */}


        </div>
    )
}

export default UnderMaintenance