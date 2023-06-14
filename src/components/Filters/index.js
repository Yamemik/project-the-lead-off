import Checkbox from "../UI/Checkbox";
import DropdownList from "../UI/DropdownList";
import Input from "../UI/Input";
import Button from "../UI/Button";

import "./Filters.scss";

const Filters = () => {
    return (
        <>
            <section className="filters">
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Товарная группа</h6>
                    <DropdownList />
                    <div className="filters__filter-add">
                        <div className="filters__filter-add-wrapper">
                            <img
                                className="filters__filter-add-wrapper-img"
                                src="/img/filters/plus.svg"
                                alt="Добавить фильтр"
                            />
                            <p className="filters__filter-add-wrapper-text">добавить</p>
                        </div>
                    </div>
                </div>
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Номенклатура</h6>
                    <DropdownList />
                    <div className="filters__filter-add">
                        <div className="filters__filter-add-wrapper">
                            <img
                                className="filters__filter-add-wrapper-img"
                                src="/img/filters/plus.svg"
                                alt="Добавить фильтр"
                            />
                            <p className="filters__filter-add-wrapper-text">добавить</p>
                        </div>
                    </div>
                </div>
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Оценка</h6>
                    <DropdownList />
                    <div className="filters__filter-add">
                        <div className="filters__filter-add-wrapper">
                            <img
                                className="filters__filter-add-wrapper-img"
                                src="/img/filters/plus.svg"
                                alt="Добавить фильтр"
                            />
                            <p className="filters__filter-add-wrapper-text">добавить</p>
                        </div>
                    </div>
                </div>
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Цена</h6>
                    <div className="filters__filter-price-box">
                        <Input type="number" placeholder="От" />
                        <Input type="number" placeholder="До" />
                    </div>
                </div>
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Покупатель</h6>
                    <Checkbox text="частная организация" />
                    <Checkbox text="государственная организация" />
                </div>
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Закупка</h6>
                    <Checkbox text="прямая" />
                    <Checkbox text="тендер" />
                </div>
                <div className="filters__filter">
                    <h6 className="filters__filter-title">Тип заявки</h6>
                    <Checkbox text="горящая" />
                    <Checkbox text="срочная" />
                </div>
            </section>
            <Button text="Применить" />
        </>
    );
};

export default Filters;
