import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";

import "./AdminPanelHome.scss";

const AdminPanelHome = () => {
    return (
        <LayoutPage title="Главная">
            <LayoutBlocks addClass={"layoutBlocks__adminPanelHome"}>
                <LayoutBlock title={["Пользователи", "users"]}>
                    <div className="adminPanelHome__rows">
                        <div className="adminPanelHome__rows-row">
                            Всего: <span>1 000</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            С активными заявками: <span>666</span>
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title={["Заявки", "orders"]}>
                    <div className="adminPanelHome__rows">
                        <div className="adminPanelHome__rows-row">
                            Всего: <span>748</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            Обработано сегодня: <span>666</span>
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title={["Финансовая статистика", "analytics"]}>
                    <div className="adminPanelHome__rows">
                        <div className="adminPanelHome__rows-row">
                            Оплачено всего: <span>1 032</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            Оплат сегодня: <span>84</span>
                        </div>
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelHome;
