const getAllBusinessLines = lines => {
    let str = "";
    lines.map((line, index) => {
        if (index === lines.length - 1) {
            str += `${line[0]} / ${line[1]} / ${line[2]}`;
        } else {
            str += `${line[0]} / ${line[1]} / ${line[2]}, `;
        }
    });
    return str;
};

export default getAllBusinessLines;
