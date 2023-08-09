import { useParams } from "react-router-dom";

import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import Button from "../../../../components/UI/Button";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import axios from "../../../../utils/axios";
import getFormatUserTelephone from "../../../../utils/getFormatUserTelephone";
import getUserRegionsLine from "../../../../utils/getUserRegionsLine";
import getUserBusinessLine from "../../../../utils/getUserBusinessLine";

const AdminPanelUser = () => {
    const params = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        axios
            .get(`/api/admin/user/${params.id}`)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err));
    }, []);

    const handleDeleteUser = () => {
        axios
            .delete(`/api/admin/user/${params.id}`)
            .then(_ => {
                toast.success("Пользователь удален");
                setTimeout(() => {
                    window.location.href = "/platform/admin-panel/users";
                }, 1200);
            })
            .catch(_ => toast.error("Ошибка при удалении пользователя"));
    };

    return (
        <LayoutPage title={`Пользователь №${params?.id}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    {user && (
                        <div className="order">
                            <div className="order__row">
                                <div className="order__row-title">Дата регистрации:</div>
                                <div className="order__row-text">{new Date(user.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">ФИО:</div>
                                <div className="order__row-text">{user.fio}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Email:</div>
                                <div className="order__row-text">{user.email}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Телефон:</div>
                                <div className="order__row-text">{getFormatUserTelephone(user.telephone)}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Организация:</div>
                                <div className="order__row-text">{user.organization}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Регион:</div>
                                <div className="order__row-text">{getUserRegionsLine(user.region)}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Направление бизнеса:</div>
                                <div className="order__row-text">{getUserBusinessLine(user.business_line)}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Доступ к закрытым заявкам:</div>
                                <div className="order__row-text">{user.access_to_open ? "да" : "нет"}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Баланс:</div>
                                <div className="order__row-text">{user.balance} руб.</div>
                            </div>
                        </div>
                    )}
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Удалить" click={handleDeleteUser} />
                <Button
                    type="fill"
                    text="Редактировать"
                    click={() => (window.location.href = `/platform/admin-panel/edit-user/${params.id}`)}
                />
            </div>
        </LayoutPage>
    );
};

export default AdminPanelUser;
