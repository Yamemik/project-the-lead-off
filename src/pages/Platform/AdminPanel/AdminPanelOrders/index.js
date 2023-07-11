import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";
import Pagination from "../../../../components/Pagination";

const AdminPanelOrders = () => {
    const data = [
      {
        id: 1,
        create_date: "23.04.2023",
        login: "Строй. материалы",
        FIO: "Лаки и краски",
        phone: "Москва",
        region: "крупная",
        balance: "900 руб.",
        category: "Новая",
    },
    {
      id: 1,
      create_date: "23.04.2023",
      login: "Строй. материалы",
      FIO: "Лаки и краски",
      phone: "Москва",
      region: "крупная",
      balance: "900 руб.",
      category: "Новая",
  },
  {
    id: 1,
    create_date: "23.04.2023",
    login: "Строй. материалы",
    FIO: "Лаки и краски",
    phone: "Москва",
    region: "крупная",
    balance: "900 руб.",
    category: "Новая",
},
{
  id: 1,
  create_date: "23.04.2023",
  login: "Строй. материалы",
  FIO: "Лаки и краски",
  phone: "Москва",
  region: "крупная",
  balance: "900 руб.",
  category: "Новая",
},
{
        id: 1,
        create_date: "23.04.2023",
        login: "Строй. материалы",
        FIO: "Лаки и краски",
        phone: "Москва",
        region: "крупная",
        balance: "900 руб.",
        category: "Новая",
    },
    {
      id: 1,
      create_date: "23.04.2023",
      login: "Строй. материалы",
      FIO: "Лаки и краски",
      phone: "Москва",
      region: "крупная",
      balance: "900 руб.",
      category: "Новая",
  },
  {
    id: 1,
    create_date: "23.04.2023",
    login: "Строй. материалы",
    FIO: "Лаки и краски",
    phone: "Москва",
    region: "крупная",
    balance: "900 руб.",
    category: "Новая",
},
{
  id: 1,
  create_date: "23.04.2023",
  login: "Строй. материалы",
  FIO: "Лаки и краски",
  phone: "Москва",
  region: "крупная",
  balance: "900 руб.",
  category: "Новая",
},
{
id: 1,
create_date: "23.04.2023",
login: "Строй. материалы",
FIO: "Лаки и краски",
phone: "Москва",
region: "крупная",
balance: "900 руб.",
category: "Новая",
},
{
      id: 1,
      create_date: "23.04.2023",
      login: "Строй. материалы",
      FIO: "Лаки и краски",
      phone: "Москва",
      region: "крупная",
      balance: "900 руб.",
      category: "Новая",
  },
  {
    id: 1,
    create_date: "23.04.2023",
    login: "Строй. материалы",
    FIO: "Лаки и краски",
    phone: "Москва",
    region: "крупная",
    balance: "900 руб.",
    category: "Новая",
},
{
  id: 1,
  create_date: "23.04.2023",
  login: "Строй. материалы",
  FIO: "Лаки и краски",
  phone: "Москва",
  region: "крупная",
  balance: "900 руб.",
  category: "Новая",
},
{
id: 1,
create_date: "23.04.2023",
login: "Строй. материалы",
FIO: "Лаки и краски",
phone: "Москва",
region: "крупная",
balance: "900 руб.",
category: "Новая",
},
{
id: 1,
create_date: "23.04.2023",
login: "Строй. материалы",
FIO: "Лаки и краски",
phone: "Москва",
region: "крупная",
balance: "900 руб.",
category: "Новая",
},
{
    id: 1,
    create_date: "23.04.2023",
    login: "Строй. материалы",
    FIO: "Лаки и краски",
    phone: "Москва",
    region: "крупная",
    balance: "900 руб.",
    category: "Новая",
},
        {
            id: 1,
            create_date: "23.04.2023",
            login: "Строй. материалы",
            FIO: "Лаки и краски",
            phone: "Москва",
            region: "крупная",
            balance: "900 руб.",
            category: "Новая",
        },
        {
          id: 1,
          create_date: "23.04.2023",
          login: "Строй. материалы",
          FIO: "Лаки и краски",
          phone: "Москва",
          region: "крупная",
          balance: "900 руб.",
          category: "Новая",
      },
      {
        id: 1,
        create_date: "23.04.2023",
        login: "Строй. материалы",
        FIO: "Лаки и краски",
        phone: "Москва",
        region: "крупная",
        balance: "900 руб.",
        category: "Новая",
    },
    {
      id: 1,
      create_date: "23.04.2023",
      login: "Строй. материалы",
      FIO: "Лаки и краски",
      phone: "Москва",
      region: "крупная",
      balance: "900 руб.",
      category: "Новая",
  },
  {
            id: 1,
            create_date: "23.04.2023",
            login: "Строй. материалы",
            FIO: "Лаки и краски",
            phone: "Москва",
            region: "крупная",
            balance: "900 руб.",
            category: "Новая",
        },
    ];

    return (
        <LayoutPage title="Заявки" isOrdersTable>
            <LayoutBlocks>
                <LayoutBlock>
                    <Pagination
                        items={data}
                        itemsPerPage={5}
                        isAdminPanelTable
                        head={[
                            "ID",
                            "Дата создания",
                            "Товарная группа",
                            "Номенклатура",
                            "Регион",
                            "Оценка",
                            "Стоимость",
                            "Статус",
                        ]}
                    />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelOrders;
