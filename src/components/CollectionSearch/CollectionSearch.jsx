import React from 'react'
import './CollectionSearch.scss'
import { BsSearch } from 'react-icons/bs'


function CollectionSearch({ orignal, setCurrent }) {
    console.log(orignal, setCurrent)
    const filterSelection = (e) => {
        if (e !== '' && orignal.length > 0) {
            let filteredItems = orignal.filter((item) => {
                return (item?.name.toLowerCase().includes(e.toLowerCase()) || item?.block_number_minted.toLowerCase().includes(e.toLowerCase()))
            })
            setCurrent(filteredItems);
        } else {
            setCurrent(orignal)
        }
    }

    return (
        <div className="collectionSearch">
            <input type="text" placeholder='Search NFT' onChange={(e) => { filterSelection(e.target.value) }} />
            <BsSearch className='icon' />
        </div>
    )
}

export default CollectionSearch