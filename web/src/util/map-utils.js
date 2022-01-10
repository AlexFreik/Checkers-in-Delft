/**
 * Retrieves the only key from a map. If the map contains number of entries != 1, returns undefined
 * @param map {Map}
 */
function getOnlyKey(map) {
    return getOnlyEntry(map)[0]
}

/**
 * Retrieves the only entry from a map. If the map contains number of entries != 1, returns undefined
 * @param map {Map}
 */
function getOnlyEntry(map) {
    return map.size === 1 ? Array.from(map.entries())[0] : undefined
}

module.exports = { getOnlyKey }
