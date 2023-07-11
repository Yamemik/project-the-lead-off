const sliceBigString = (str, maxLength = 8, slicing = [0, 8]) => {
    let str_new = str.toString();
    if (str.length > maxLength) str_new = str_new.slice(slicing[0], slicing[1]) + "...";
    return str_new;
};

export default sliceBigString;
