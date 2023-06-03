import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import LayoutPage from "./components/Layouts/LayoutPage";
import LayoutBlocks from "./components/Layouts/LayoutBlocks";
import LayoutBlock from "./components/Layouts/LayoutBlock";
import TableRow from "./components/TableRow";
import SeeAllButton from "./components/SeeAllButton";

import ReactPaginate from "react-paginate";

const App = () => {
    const items = useMemo(
        () => [
            {
                id: 1,
                productGroup: "Металлы",
                nomenclature: 10,
                region: "Россия",
                estimation: "крупная+",
                price: 800,
                additions: ["private", "express"],
            },
            {
                id: 2,
                productGroup: "Металлы",
                nomenclature: 10,
                region: "Россия",
                estimation: "мелкая+",
                price: 150,
                additions: ["private"],
            },
            {
                id: 3,
                productGroup: "Металлы",
                nomenclature: 10,
                region: "Россия",
                estimation: "крупная+",
                price: 400,
                additions: ["private", "document", "building", "quickly"],
            },
            {
                id: 4,
                productGroup: "Металлы",
                nomenclature: 10,
                region: "Россия",
                estimation: "крупная+",
                price: 200,
                additions: ["building"],
            },
            {
                id: 5,
                productGroup: "Металлы",
                nomenclature: 10,
                region: "Россия",
                estimation: "крупная+",
                price: 300,
                additions: ["document", "express"],
            },
        ],
        [],
    );

    // пагинация
    const [currentItems_1, setCurrentItems_1] = useState(null);
    const [pageCount_1, setPageCount_1] = useState(0);
    const [itemOffset_1, setItemOffset_1] = useState(0);

    const [currentItems_2, setCurrentItems_2] = useState(null);
    const [pageCount_2, setPageCount_2] = useState(0);
    const [itemOffset_2, setItemOffset_2] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset_1 + 1;
        setCurrentItems_1(items.slice(itemOffset_1, endOffset));
        setPageCount_1(Math.ceil(items.length / 1));
    }, [items, itemOffset_1]);

    useEffect(() => {
        const endOffset = itemOffset_2 + 1;
        setCurrentItems_2(items.slice(itemOffset_2, endOffset));
        setPageCount_2(Math.ceil(items.length / 1));
    }, [items, itemOffset_2]);

    const handlePageClick_1 = e => {
        const newOffset = (e.selected * 1) % items.length;
        setItemOffset_1(newOffset);
    };

    const handlePageClick_2 = e => {
        const newOffset = (e.selected * 1) % items.length;
        setItemOffset_2(newOffset);
    };

    return (
        <>
            <Header />
            <LayoutPage title="Главная">
                <LayoutBlocks>
                    <LayoutBlock title="Подходящие заявки">
                        {window.innerWidth > 1280 ? (
                            items.map(item => (
                                <TableRow
                                    key={item.id}
                                    id={item.id}
                                    productGroup={item.productGroup}
                                    nomenclature={item.nomenclature}
                                    region={item.region}
                                    estimation={item.estimation}
                                    price={item.price}
                                    additions={item.additions}
                                />
                            ))
                        ) : (
                            <>
                                {currentItems_1 &&
                                    currentItems_1.map(item => (
                                        <TableRow
                                            key={item.id}
                                            id={item.id}
                                            productGroup={item.productGroup}
                                            nomenclature={item.nomenclature}
                                            region={item.region}
                                            estimation={item.estimation}
                                            price={item.price}
                                            additions={item.additions}
                                        />
                                    ))}
                                <ReactPaginate
                                    onPageChange={handlePageClick_1}
                                    pageCount={pageCount_1}
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
                        )}
                        <SeeAllButton />
                    </LayoutBlock>
                    <LayoutBlock title="Распродажа">
                        {window.innerWidth > 1280 ? (
                            items.map(item => (
                                <TableRow
                                    key={item.id}
                                    id={item.id}
                                    productGroup={item.productGroup}
                                    nomenclature={item.nomenclature}
                                    region={item.region}
                                    estimation={item.estimation}
                                    price={item.price}
                                    additions={item.additions}
                                />
                            ))
                        ) : (
                            <>
                                {currentItems_2 &&
                                    currentItems_2.map(item => (
                                        <TableRow
                                            key={item.id}
                                            id={item.id}
                                            productGroup={item.productGroup}
                                            nomenclature={item.nomenclature}
                                            region={item.region}
                                            estimation={item.estimation}
                                            price={item.price}
                                            additions={item.additions}
                                        />
                                    ))}
                                <ReactPaginate
                                    onPageChange={handlePageClick_2}
                                    pageCount={pageCount_2}
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
                        )}
                        <SeeAllButton />
                    </LayoutBlock>
                </LayoutBlocks>
            </LayoutPage>
        </>
    );
};

export default App;
