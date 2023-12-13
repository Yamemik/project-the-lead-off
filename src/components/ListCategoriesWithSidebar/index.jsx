import "./ListCategories.scss";
import { useEffect, useState } from "react";

const ListCategories = ({ items }) => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		items.map((item, index) => {
			console.log(item)
			setCategories(prevState => [...prevState, { open: false, id: index + 1 }]);
		});
	}, [items]);

	return <div className="listCategories">{<div className="listCategories__item"></div>}</div>;
};

export default ListCategories;
