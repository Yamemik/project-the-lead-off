const getUploadShortName = longName => {
    if (longName.length <= 12) {
        return longName;
    }
    return `${longName.slice(0, 4)}...${longName.slice(-6)}`;
};

export default getUploadShortName;