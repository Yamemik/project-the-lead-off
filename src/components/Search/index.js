import "./Search.scss";

const Search = ({ placeholder = "Введите запрос" }) => {
    return (
        <div className="search">
            <input className="search__input" placeholder={placeholder} />
        </div>
    );
};

export default Search;
