import "./LayoutBlocks.scss";

const LayoutBlocks = ({ children, addClass }) => {
    return <div className={`layoutBlocks ${addClass}`}>{children}</div>;
};

export default LayoutBlocks;
