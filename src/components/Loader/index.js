import ReactLoading from "react-loading";

import "./Loader.scss";

const Loader = ({ trigger = true }) => {
    return (
        <div className={`loader ${!trigger ? "loader--animated" : ""}`}>
            <div class="loader__box">
                <ReactLoading type="spinningBubbles" color="#1f2a37" width="100px" height="100px" />
                <h1 className="loader__box-download">Загрузка</h1>
            </div>
        </div>
    );
};

export default Loader;
