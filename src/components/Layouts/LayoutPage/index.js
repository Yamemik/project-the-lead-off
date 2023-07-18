import "./LayoutPage.scss";

import Button from "../../../components/UI/Button";
import Search from "../../Search";

const LayoutPage = ({
    title = "Заголовок",
    children,
    isUsersTable,
    isOrdersTable,
    isRejectionsTable,
    isDuplicatesTable,
    searchQuery,
    setSearchQuery
}) => {
    return (
        <div className="layoutPage">
            {isUsersTable ? (
                <div className="layoutPage__title layoutPage__title--extra">
                    <p className="layoutPage__title-text">{title}</p>
                    <div className="layoutPage__title-box">
                        <Button text="Добавить пользователя" click={() => window.location.href = "/platform/admin-panel/create-user"}/>
                        <Search placeholder="Поиск по пользователям" searchQuery={searchQuery} setSearchQuery={(value) => setSearchQuery(value)}/>
                    </div>
                </div>
            ) : isOrdersTable ? (
                <div className="layoutPage__title layoutPage__title--extra">
                    <p className="layoutPage__title-text">{title}</p>
                    <div className="layoutPage__title-box">
                        <Button text="Добавить заявку" toUrl="/platform/admin-panel/create-order"/>
                        <Button text="Работа с дублями" />
                        <Button text="Отказы" />
                        <Search placeholder="Поиск по заявкам" searchQuery={searchQuery} setSearchQuery={(value) => setSearchQuery(value)}/>
                    </div>
                </div>
            ) : isRejectionsTable ? (
                <div className="layoutPage__title layoutPage__title--extra">
                    <p className="layoutPage__title-text">{title}</p>
                    <div className="layoutPage__title-box">
                        <Search placeholder="Поиск по заявкам" searchQuery={searchQuery} setSearchQuery={(value) => setSearchQuery(value)}/>
                    </div>
                </div>
            ) : isDuplicatesTable ? (
                <div className="layoutPage__title layoutPage__title--extra">
                    <p className="layoutPage__title-text">{title}</p>
                    <div className="layoutPage__title-box">
                    <Button text="Обновить" />
                    <Button text="Объединить все дубли" />
                        <Search placeholder="Поиск" searchQuery={searchQuery} setSearchQuery={(value) => setSearchQuery(value)}/>
                    </div>
                </div>
            ) : (
                <div className="layoutPage__title">{title}</div>
            )}
            {children}
        </div>
    );
};

export default LayoutPage;
