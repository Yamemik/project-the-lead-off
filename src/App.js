import Header from "./components/Header";
import LayoutPage from "./components/Layouts/LayoutPage";
import LayoutBlocks from "./components/Layouts/LayoutBlocks";
import LayoutBlock from "./components/Layouts/LayoutBlock";
import TableRow from "./components/TableRow";

const App = () => {
    return (
        <>
            <Header />
            <LayoutPage title="Главная">
                <LayoutBlocks>
                    <LayoutBlock title="Подходящие заявки">
                        <TableRow
                            id="1"
                            productGroup="Металлы"
                            nomenclature="10"
                            region="Россия"
                            estimation="крупная+"
                            price="600"
                        />
                    </LayoutBlock>
                    <LayoutBlock title="Распродажа" />
                </LayoutBlocks>
            </LayoutPage>
        </>
    );
};

export default App;
