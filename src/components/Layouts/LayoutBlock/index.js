import "./LayoutBlock.scss";

const LayoutBlock = ({
    title,
    children = "Пустой блок",
    isHaveFiltersInPage,
    isOpenMobileFilters,
    setIsOpenMobileFilters,
}) => {
    return (
        <div className="layoutBlock">
            {isHaveFiltersInPage && window.innerWidth <= 768 ? (
                <>
                    <div className="layoutBlock__subtitle--wrapper">
                        {title && typeof title === "string" ? (
                            <h6 className="layoutBlock__subtitle">{title}</h6>
                        ) : (
                            <h6 className="layoutBlock__subtitle">
                                {title[0]}
                                <img src={`/img/adminPanel/${title[1]}.svg`} alt="" />
                            </h6>
                        )}
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
                </>
            ) : (
                title && (
                    <>
                        {title && typeof title === "string" ? (
                            <h6 className="layoutBlock__subtitle">{title}</h6>
                        ) : (
                            <h6 className="layoutBlock__subtitle">
                                <img
                                    src={`/img/adminPanel/${title[1]}.svg`}
                                    alt=""
                                    style={{
                                        filter: "invert(41%) sepia(65%) saturate(579%) hue-rotate(167deg) brightness(85%) contrast(87%)",
                                    }}
                                />
                                {title[0]}
                            </h6>
                        )}
                    </>
                )
            )}
            {children}
        </div>
    );
};

export default LayoutBlock;
