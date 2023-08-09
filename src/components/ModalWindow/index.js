import "./ModalWindow.scss";

const ModalWindow = ({ trigger, children }) => {
    if (trigger) {
        return (
            <div className="modalWindow">
                <div className="modalWindow__body">{children}</div>
            </div>
        );
    }
};

export default ModalWindow;
