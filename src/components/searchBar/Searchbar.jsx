import React from 'react'
import './searchbar.scss'
import { BsSearch } from 'react-icons/bs'

function Searchbar({ orignalItems, setCurrentItems }) {

    const filterSelection = (e) => {
     // console.log(orignalItems, e);
        if (e !== '') {
            let filteredItems = orignalItems.filter((item) => {
                return (item?.cid.toLowerCase().includes(e.toLowerCase()) || item?.fileName.toLowerCase().includes(e.toLowerCase()))
            })
            setCurrentItems(filteredItems);
        } else {
            setCurrentItems(orignalItems)
        }
    }
    return (
        <div className="searchbarContainer">
            <input type="text" placeholder='Search Name / CID' onChange={(e) => { filterSelection(e.target.value) }} />
            <BsSearch className='icon' />
        </div>
    )
}

export default Searchbar