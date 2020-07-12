export default (toDoItems: Item[], filters: any[]): Item[] => {
    const filteredResults = toDoItems.filter(item => {
        // only do active filters?
        return filters.every(filter => filter.filter(item));
    })
    return filteredResults;
}