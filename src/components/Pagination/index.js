import ReactPaginate from "react-paginate";

import "./Pagination.scss";
import { useEffect, useState } from "react";
import TableRow from "../TableRow";

const Pagination = ({ items, itemsPerPage = 1, isCanBuy, isCanSale, isCanClose, isHaveDateDelete, isHaveStatus }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (window.innerWidth <= 1280) {
            const endOffset = offset + 1;
            setCurrentItems(items.slice(offset, endOffset));
            setPageCount(Math.ceil(items.length / 1));
        } else {
            const endOffset = offset + itemsPerPage;
            setCurrentItems(items.slice(offset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }
    }, [items, offset, itemsPerPage]);

    const handlePageClick = e => {
        if (window.innerWidth <= 1280) {
            const newOffset = (e.selected * 1) % items.length;
            setOffset(newOffset);
        } else {
            const newOffset = (e.selected * itemsPerPage) % items.length;
            setOffset(newOffset);
        }
    };

    const getAdditions = item => {
        let arr = [...item.additions];
        if (isCanBuy) arr.push("cart");
        if (isCanSale) arr.push("sale");
        if (isCanClose) arr.push("close");
        return arr;
    };

    return (
        <>
            {currentItems &&
                currentItems.map(item => (
                    <TableRow
                        key={item.id}
                        id={item.id}
                        productGroup={item.product_group}
                        nomenclature={item.nomenclature}
                        region={item.region}
                        estimation={item.estimation}
                        price={item.price}
                        additions={getAdditions(item)}
                        isHaveDateDelete={isHaveDateDelete}
                        isHaveStatus={isHaveStatus}
                        status={item.status}
                    />
                ))}
            <ReactPaginate
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                containerClassName="pagination"
                pageClassName="pagination__page"
                previousClassName="pagination__prev"
                nextClassName="pagination__next"
                activeClassName="pagination__active"
                disabledClassName="pagination__disabled"
                previousLabel=""
                nextLabel=""
            />
        </>
    );
};

export default Pagination;
