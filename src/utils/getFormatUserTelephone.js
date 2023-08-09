const getFormatUserTelephone = (telephone) => {
    if (telephone[0] === "+") {
        return telephone
    }
    return `+7${telephone.slice(1, 4)}${telephone.slice(4, 7)}${telephone.slice(7, 9)}${telephone.slice(9, 11)}`;
};

export default getFormatUserTelephone;
