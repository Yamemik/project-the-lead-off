import "./LayoutPage.scss";

const LayoutPage = ({ title = "Заголовок", children }) => {
    return (
        <div className="layoutPage">
            <div className="layoutPage__title">{title}</div>
            {children}
        </div>
    );
};

export default LayoutPage;
