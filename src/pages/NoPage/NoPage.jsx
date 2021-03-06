import React from 'react';
import './NoPage.scss';
import TypeAnimation from 'react-type-animation';


function PageNotFound() {
    return (
        <div className="PageNotFound">
            <div className="bg_pattern"></div>
            <div className="logoContainer">
                <img src="/icons/logo.png" width={100} height={100} alt="" />
            </div>
            <div className="title">
                <p className='gradient__text title__text'>404</p>
                <TypeAnimation
                    cursor={true}
                    className='typeAnimation'
                    sequence={[
                        'Page Not Found',
                        3000,
                    ]}
                    wrapper="a"
                    repeat={Infinity}
                />
            </div>

            <div className="goBack ptr">
                <a href="/">Go Back</a>
            </div>


        </div>
    )
}

export default PageNotFound