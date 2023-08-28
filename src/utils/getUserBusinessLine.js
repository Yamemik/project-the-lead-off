const getAllBusinessLines = lines => {
	let arr = [];
	lines.map((line, index) => {
		arr.push(line.filter(item => item !== "").join(" / "));
	});
	return arr.join(", ");
};

export default getAllBusinessLines;
