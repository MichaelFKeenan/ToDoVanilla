export default (toDoItems: Item[], filters: IFilter[]): Item[] => {
    const filteredResults = toDoItems.filter(item => {
        // only do active filters?
        return filters.every(filter => filter.Filter(item));
    })
    return filteredResults;
}