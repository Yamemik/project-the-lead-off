import "./Search.scss";

const Search = ({ placeholder = "Введите запрос", searchQuery, setSearchQuery }) => {
    return (
        <div className="search">
            <input className="search__input" placeholder={placeholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
    );
};

export default Search;
