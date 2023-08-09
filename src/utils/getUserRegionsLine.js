const getUserRegionsLine = (array_regions) => {
    let arr = []
    array_regions.map(region => arr.push(region.join(" / ")))
    return arr.join(", ")
}

export default getUserRegionsLine