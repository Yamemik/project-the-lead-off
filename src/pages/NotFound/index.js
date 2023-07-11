import "./NotFound.scss";

import Button from "./../../components/UI/Button";

const NotFound = () => {
    const getMainPage = () => {
        if (window.location.href.split("/").includes("landing")) {
            return "/landing";
        } else {
            return "/platform/home";
        }
    };

    return (
        <div className="notFound">
            <img className="notFound__photo" src="/img/notFound/error.png" alt="" />
            <p className="notFound__text">Страницы не существует</p>
            <Button toUrl={getMainPage()} text="Вернуться на главную" />
        </div>
    );
};

export default NotFound;
