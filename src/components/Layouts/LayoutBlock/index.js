import "./LayoutBlock.scss";

const LayoutBlock = ({ title = "Подзаголовок", children = "Пустой блок" }) => {
    return (
        <div className="layoutBlock">
            <h6 className="layoutBlock__subtitle">{title}</h6>
            {children}
        </div>
    );
};

export default LayoutBlock;
