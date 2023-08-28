import Draggable from "react-draggable";
import "./TableAdminPanel.scss";
import Button from "../UI/Button";
import ModalWindow from "../ModalWindow";
import { useState } from "react";

const TableAdminPanel = ({
	head,
	data,
	canEdit,
	canDelete,
	canSee,
	clickSee,
	canYes,
	canNo,
	clickDelete,
	clickEdit,
	clickYes,
	clickNo,
	isDuplicatesTable,
	isRejections
}) => {
	const [deleteItemPopup, setDeleteItemPopup] = useState(false);
	const [deleteItemID, setDeleteItemID] = useState(null);

	const handleDeleteItem = id => {
		clickDelete(deleteItemID);
		setDeleteItemID(null);
		setDeleteItemPopup(false);
	};

	return (
		<>
			{window.innerWidth <= 1420 ? (
				<Draggable axis="x">
					<div className="tableAdminPanel">
						<div className="tableAdminPanel__head">
							{head.map(item => (
								<div className="tableAdminPanel__head-item">
									{item}
								</div>
							))}
						</div>
						{data.map(
							({
								_id,
								id,
								create_date,
								login,
								FIO,
								phone,
								region,
								balance,
								category,
							}) => (
								<div className="tableAdminPanel__row">
									<div className="tableAdminPanel__row-item">
										{id}
									</div>
									<div className="tableAdminPanel__row-item">
										{create_date}
									</div>
									<div className="tableAdminPanel__row-item">
										{login}
									</div>
									<div className="tableAdminPanel__row-item">
										{FIO}
									</div>
									<div className="tableAdminPanel__row-item">
										{phone}
									</div>
									<div className="tableAdminPanel__row-item">
										{region}
									</div>
									<div className="tableAdminPanel__row-item">
										{balance}
									</div>
									<div className="tableAdminPanel__row-item">
										{category}
									</div>
									{canEdit &&
										canDelete &&
										canSee &&
										!isDuplicatesTable && (
											<div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
												<img
													src="/img/adminPanel/eye.svg"
													alt="Смотреть"
													onClick={() =>
														clickSee(_id)
													}
												/>
												<img
													src="/img/UI/edit.svg"
													alt="Редактировать"
													onClick={() =>
														clickEdit(_id)
													}
												/>
												<img
													src="/img/UI/delete.svg"
													alt="Удалить"
													onClick={() => {
														setDeleteItemPopup(
															true,
														);
														setDeleteItemID(_id);
													}}
												/>
											</div>
										)}
									{isDuplicatesTable && (
										<div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
											<img
												src="/img/adminPanel/eye.svg"
												alt="Смотреть"
												onClick={() => clickSee(_id)}
											/>
										</div>
									)}
									{canYes && canNo && (
										<div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
											<img
												src="/img/adminPanel/eye.svg"
												alt="Смотреть"
												onClick={() => clickSee(_id)}
											/>
											<img
												src="/img/adminPanel/yes.svg"
												alt="Принять"
												onClick={() => clickYes(_id)}
											/>
											<img
												src="/img/adminPanel/no.svg"
												alt="Отклонить"
												onClick={() => clickNo(_id)}
											/>
										</div>
									)}
								</div>
							),
						)}
					</div>
				</Draggable>
			) : (
				<div className="tableAdminPanel">
					<div className="tableAdminPanel__head">
						{head.map(item => (
							<div className="tableAdminPanel__head-item">
								{item}
							</div>
						))}
					</div>
					{data.map(
						({
							_id,
							id,
							create_date,
							login,
							FIO,
							phone,
							region,
							balance,
							category,
						}) => (
							<div className="tableAdminPanel__row">
								<div className="tableAdminPanel__row-item">
									{id}
								</div>
								<div className="tableAdminPanel__row-item">
									{create_date}
								</div>
								<div className="tableAdminPanel__row-item">
									{login}
								</div>
								<div className="tableAdminPanel__row-item">
									{FIO}
								</div>
								<div className="tableAdminPanel__row-item">
									{phone}
								</div>
								<div className="tableAdminPanel__row-item">
									{region}
								</div>
								<div className="tableAdminPanel__row-item">
									{balance}
								</div>
								<div className="tableAdminPanel__row-item">
									{category}
								</div>
								{canEdit &&
									canDelete &&
									canSee &&
									!isDuplicatesTable && (
										<div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
											<img
												src="/img/adminPanel/eye.svg"
												alt="Смотреть"
												onClick={() => clickSee(_id)}
											/>
											<img
												src="/img/UI/edit.svg"
												alt="Редактировать"
												onClick={() => clickEdit(_id)}
											/>
											<img
												src="/img/UI/delete.svg"
												alt="Удалить"
												onClick={() => {
													setDeleteItemPopup(true);
													setDeleteItemID(_id);
												}}
											/>
										</div>
									)}
								{isDuplicatesTable && (
									<div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
										<img
											src="/img/adminPanel/eye.svg"
											alt="Смотреть"
											onClick={() => clickSee(_id)}
										/>
									</div>
								)}
								{canYes && canNo && (
									<div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
										<img
											src="/img/adminPanel/eye.svg"
											alt="Смотреть"
											onClick={() => clickSee(_id)}
										/>
										<img
											src="/img/adminPanel/yes.svg"
											alt="Принять"
											onClick={() => clickYes(_id)}
										/>
										<img
											src="/img/adminPanel/no.svg"
											alt="Отклонить"
											onClick={() => clickNo(_id)}
										/>
									</div>
								)}
							</div>
						),
					)}
				</div>
			)}
			<ModalWindow trigger={deleteItemPopup}>
				<h1>
					Вы уверены, что хотите удалить{" "}
					{head[2] === "Логин" ? "пользователя" : "заявку"}?
				</h1>
				<div className="modalWindow__body-buttons">
					<Button
						text="Подтвердить"
						type="fill"
						click={handleDeleteItem}
					/>
					<Button
						text="Отменить"
						click={() => {
							setDeleteItemPopup(false);
							setDeleteItemID(null);
						}}
					/>
				</div>
			</ModalWindow>
		</>
	);
};

export default TableAdminPanel;
