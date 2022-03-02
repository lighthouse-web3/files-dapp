import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import './Pagination.scss'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';



function Pagination({ orignalData, setCurrentData, itemsPerPage }) {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orignalData.length;
        setItemOffset(newOffset);
        console.log('newOffset', newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentData(orignalData?.slice(itemOffset, endOffset));
        console.log('newOffset', orignalData);
        setPageCount(Math.ceil(orignalData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, orignalData]);
    return (
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel={<GrFormNext />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel={<GrFormPrevious />}
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination