/*
 * chunk
 * @param {Array} array - List of elements
 * @param {Number} size - Length of each chunk to group
 * @return {Array} Returns list of grouped chunks
 */
export function chunk<Type>(array: Type[], chunkSize = 1): Type[][] {
    const completedChunkedArray: Type[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const subArray = array.slice(i, i + chunkSize);
        completedChunkedArray.push(subArray);
    }
    return completedChunkedArray;
}