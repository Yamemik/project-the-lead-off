import "./Addition.scss";

const Addition = ({ name }) => {
    return (
        <div className={`addition ${name === "cart" ? "addition--cart" : ""} ${name === "sale" ? "addition--sale" : ""} ${name === "close" ? "addition--close" : ""}`}>
            <img className="addition__img" src={`/img/tableRow/additions/${name}.svg`} alt="" />
        </div>
    );
};

export default Addition;
