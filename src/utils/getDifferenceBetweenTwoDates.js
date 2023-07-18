const getDifferenceBetweenTwoDates = (firstDate, secondDate, betweenValue = "hours") => {
    if (betweenValue === "hours") {
        const fDate = new Date(firstDate).getTime();
        const sDate = new Date(secondDate).getTime();
        return (sDate - fDate) / 3600 / 1000;
    }
};

export default getDifferenceBetweenTwoDates;