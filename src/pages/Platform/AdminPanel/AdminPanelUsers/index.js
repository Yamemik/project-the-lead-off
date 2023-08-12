import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";
import Pagination from "../../../../components/Pagination";

import axios from "../../../../utils/axios";
import sliceBigString from "../../../../utils/sliceBigString";
import getFormatUserTelephone from "../../../../utils/getFormatUserTelephone";
import getUserRegionsLine from "../../../../utils/getUserRegionsLine";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminPanelUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const getAllBusinessLines = (lines) => {
        let str = ""
        lines.map((line, index) => {
            if (index === lines.length - 1) {
                str += `${line[0]} / ${line[1]} / ${line[2]}`
            } else {
                str += `${line[0]} / ${line[1]} / ${line[2]}, `
            }
        })
        return str
    }

    useEffect(() => {
        axios
            .get("/api/admin/user")
            .then(({ data }) => {
                data.reverse().map(user =>
                    setUsers(prev => [
                        ...prev,
                        {
                            _id: user._id,
                            id: sliceBigString(user._id, 8, [0, 3]),
                            create_date: new Date(user.createdAt).toLocaleDateString(),
                            login: user.email,
                            FIO: user.fio,
                            phone: getFormatUserTelephone(user.telephone),
                            region: getUserRegionsLine(user.region),
                            balance: user.balance,
                            category: getAllBusinessLines(user.business_line),
                        },
                    ]),
                );
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteUser = userID => {
        axios
            .delete(`/api/admin/user/${userID}`)
            .then(_ => {
                toast.success("Пользователь удален");
                axios
                    .get("/api/admin/user")
                    .then(({ data }) => {
                        setUsers([]);
                        data.reverse().map(user =>
                            setUsers(prev => [
                                ...prev,
                                {
                                    _id: user._id,
                                    id: sliceBigString(user._id, 8, [0, 3]),
                                    create_date: new Date(user.createdAt).toLocaleDateString(),
                                    login: user.email,
                                    FIO: user.fio,
                                    phone: getFormatUserTelephone(user.telephone),
                                    region: user.region.join(" / "),
                                    balance: user.balance,
                                    category: getAllBusinessLines(user.business_line),
                                },
                            ]),
                        );
                    })
                    .catch(err => console.log(err));
            })
            .catch(_ => toast.error("Ошибка при удалении пользователя"));
    };

    const handleEditUser = userID => {
        window.location.href = `/platform/admin-panel/edit-user/${userID}`;
    };

    return (
        <LayoutPage
            title="Пользователи"
            isUsersTable
            searchQuery={searchQuery}
            setSearchQuery={value => setSearchQuery(value)}>
            <LayoutBlocks>
                <LayoutBlock isOverflowHidden>
                    {users.length > 0 && (
                        <Pagination
                            head={[
                                "ID",
                                "Дата регистрации",
                                "Логин",
                                "ФИО",
                                "Телефон",
                                "Регион",
                                "Баланс",
                                "Направление бизнеса",
                            ]}
                            items={users.filter(
                                user =>
                                    user.FIO.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    user.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    user.phone.includes(searchQuery.toLowerCase()) ||
                                    user.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    String(user.balance).includes(searchQuery) ||
                                    user.category.toLowerCase().includes(searchQuery.toLowerCase()),
                            )}
                            itemsPerPage={5}
                            isAdminPanelTable
                            clickSee={userID =>  window.location.href = `/platform/admin-panel/user/${userID}`}
                            clickDelete={userID => handleDeleteUser(userID)}
                            clickEdit={userID => handleEditUser(userID)}
                        />
                    )}
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelUsers;
