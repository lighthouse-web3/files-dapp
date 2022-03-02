import React from 'react'
import './MintNFT.scss'
import Dropzone from '../../../components/dropzone'
import Overlay from '../../../containers/Overlay/Overlay'

function MintNFT() {
    return (
        <div className="mintNFT">
            <Overlay />
            <div className="mintNFT__title">
                <p>Mint NFT</p>
            </div>
            <div className="mintNFT__content">
                <p>Images, Videos, Audio or 3D Model <br /> <small>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</small></p>

                <Dropzone />

                <div className="fieldContainer">
                    <div className="fieldContainer__title">Name</div>
                    <input type="text" placeholder='Item Name' />
                </div>
                <div className="fieldContainer">
                    <div className="fieldContainer__title">External Link</div>
                    <div className="fieldContainer__information">Lighthouse will include a link to this URL on this item’s detail page, so that user can click to learn more about it. You are welcome to link to your own webpage with more details.</div>
                    <input type="text" placeholder='www.yoursite.com/file123' />
                </div>

                <div className="fieldContainer">
                    <div className="fieldContainer__title">Description</div>
                    <div className="fieldContainer__information">
                        The description will be included on the item’s detail page underneath its Image. Markdown syntax is supported.
                    </div>
                    <textarea placeholder='Description here'></textarea>
                </div>




            </div>
        </div>
    )
}

export default MintNFT