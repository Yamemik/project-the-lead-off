import ReactPaginate from "react-paginate";

import "./Pagination.scss";
import { useEffect, useState } from "react";
import TableRow from "../TableRow";
import TableAdminPanel from "../TableAdminPanel";

const Pagination = ({
    items,
    itemsPerPage = 1,
    isCanBuy,
    isCanSale,
    isCanClose,
    isHaveDateDelete,
    isHaveStatus,
    isAdminPanelTable,
    isRejections,
    head,
    setNewData_parent_2
}) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (window.innerWidth <= 1280 && !isAdminPanelTable) {
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
        if (window.innerWidth <= 1280 && !isAdminPanelTable) {
            const newOffset = (e.selected * 1) % items.length;
            setOffset(newOffset);
        } else {
            const newOffset = (e.selected * itemsPerPage) % items.length;
            setOffset(newOffset);
        }
    };

    const getAdditions = item => {
        let arr = []
        if (item?.type_buyer?.includes("частная")) arr.push("private")
        if (item?.type_buyer?.includes("государственная")) arr.push("state")
        if (item?.type_order?.includes("тендер")) arr.push("tender")
        if (item?.is_urgent === "да") arr.push("urgent")
        if (isCanBuy) arr.push("cart");
        if (isCanSale) arr.push("sale");
        if (isCanClose) arr.push("close");
        return arr;
    };

    return (
        <>
            {currentItems &&
                (isAdminPanelTable ? (
                    <TableAdminPanel
                        canEdit={!isRejections}
                        canDelete={!isRejections}
                        canYes={isRejections}
                        canNo={isRejections}
                        head={head}
                        data={currentItems}
                    />
                ) : (
                    currentItems.map(item => (
                        <TableRow
                            setNewData_parent={arg => setNewData_parent_2(arg)}
                            key={item._id}
                            id={item._id}
                            productGroup={item.nomeclature[0][0]}
                            nomenclature={item.nomeclature[0][2]}
                            region={item.region}
                            estimation={item.score}
                            price={item.price}
                            additions={getAdditions(item)}
                            isHaveDateDelete={isHaveDateDelete}
                            isHaveStatus={isHaveStatus}
                            status={item.status}
                        />
                    ))
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
