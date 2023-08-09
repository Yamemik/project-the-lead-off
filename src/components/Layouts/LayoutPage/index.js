import "./LayoutPage.scss";

import Button from "../../../components/UI/Button";
import Search from "../../Search";
import { useEffect } from "react";
import { useState } from "react";

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
    const [debugMode, setDebugMode] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('debug_mode') === null) {
            localStorage.setItem("debug_mode", "off")
        } else if (localStorage.getItem('debug_mode') === "on") {
            setDebugMode(true)
        }
    }, [])

    useEffect(() => {
        if (debugMode) {
            localStorage.setItem("debug_mode", "on")
        } else {
            localStorage.setItem("debug_mode", "off")
        }
    }, [debugMode])

    return (
        <div className="layoutPage">
            {JSON.parse(localStorage.getItem('user'))?.is_admin && <button className="debug-mode" onClick={ () => {
                if (localStorage.getItem('debug_mode') === "off") {
                    setDebugMode(true)
                } else {
                    setDebugMode(false)
                }
            }} style={{
                zIndex: "1000",
                position: 'fixed',
                bottom: "12px",
                right: "12px",
                borderRadius: "100px",
                fontSize: "14px",
                backgroundColor: "#222",
                color: "#fff",
                padding: "8px 12px",
                fontWeight: "500"
            }}>Debug mode: <span style={{
                color: debugMode ? "green" : "red",
                fontWeight: "600"
            }}>{debugMode ? "ON" : "OFF"}</span></button>}
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
                        {/* <Button text="Работа с дублями" /> */}
                        <Button text="Отказы" toUrl={'/platform/admin-panel/rejections'} />
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
