import "./LayoutBlock.scss";

const LayoutBlock = ({ title = "Подзаголовок", children = "Пустой блок", isHaveFiltersInPage, isOpenMobileFilters, setIsOpenMobileFilters }) => {
    return (
        <div className="layoutBlock">
            {isHaveFiltersInPage && window.innerWidth <= 768 ? (
                <>
                    <div className="layoutBlock__subtitle--wrapper">
                        <h6 className="layoutBlock__subtitle">{title}</h6>
                        <div
                            className="layoutBlock__subtitle--showMobileFilters"
                            onClick={() => setIsOpenMobileFilters(!isOpenMobileFilters)}>
                            <p className="layoutBlock__subtitle--showMobileFilters-text">
                                {isOpenMobileFilters ? "Скрыть" : "Показать"}
                            </p>
                            <img
                                src="/img/header/arrow-down.svg"
                                alt={isOpenMobileFilters ? "Скрыть" : "Показать"}
                                style={{
                                    transform: `rotate(${isOpenMobileFilters ? "-180deg" : "0deg"})`,
                                    transition: "transform .2s",
                                }}
                            />
                        </div>
                    </div>
                    {children}
                </>
            ) : (
                <>
                    <h6 className="layoutBlock__subtitle">{title}</h6>
                    {children}
                </>
            )}
        </div>
    );
};

export default LayoutBlock;
