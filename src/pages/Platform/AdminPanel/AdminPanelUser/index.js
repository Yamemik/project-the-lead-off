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
import ModalWindow from "../../../../components/ModalWindow";

const AdminPanelUser = () => {
	const params = useParams();
	const [user, setUser] = useState();
	const [deleteUserPopup, setDeleteUserPopup] = useState(false);

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
								<div className="order__row-title">
									Дата регистрации:
								</div>
								<div className="order__row-text">
									{new Date(
										user.createdAt,
									).toLocaleDateString()}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">ФИО:</div>
								<div className="order__row-text">
									{user.fio}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">Email:</div>
								<div className="order__row-text">
									{user.email}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">Телефон:</div>
								<div className="order__row-text">
									{getFormatUserTelephone(user.telephone)}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">
									Организация:
								</div>
								<div className="order__row-text">
									{user.organization}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">Регион:</div>
								<div className="order__row-text">
									{getUserRegionsLine(user.region)}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">
									Направления бизнеса:
								</div>
								<div className="order__row-text">
									{getUserBusinessLine(user.business_line)}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">
									Доступ к закрытым заявкам:
								</div>
								<div className="order__row-text">
									{user.access_to_open ? "да" : "нет"}
								</div>
							</div>
							<div className="order__row">
								<div className="order__row-title">Баланс:</div>
								<div className="order__row-text">
									{user.balance} руб.
								</div>
							</div>
							{
								Number(user.credit) > 0 && (
									<div className="order__row">
										<div className="order__row-title">Кредит:</div>
										<div className="order__row-text">
											{user.credit} руб. до {new Date(user.date_credit).toLocaleDateString()}
										</div>
									</div>
								)
							}
						</div>
					)}
				</LayoutBlock>
			</LayoutBlocks>
			<div className="order__buttons">
				<Button text="Удалить" click={() => setDeleteUserPopup(true)} />
				<Button
					type="fill"
					text="Редактировать"
					click={() =>
						(window.location.href = `/platform/admin-panel/edit-user/${params.id}`)
					}
				/>
			</div>
			<ModalWindow trigger={deleteUserPopup}>
				<h1>Вы уверены, что хотите удалить пользователя?</h1>
				<div className="modalWindow__body-buttons">
					<Button
						text="Подтвердить"
						type="fill"
						click={handleDeleteUser}
					/>
					<Button
						text="Отменить"
						click={() => setDeleteUserPopup(false)}
					/>
				</div>
			</ModalWindow>
		</LayoutPage>
	);
};

export default AdminPanelUser;