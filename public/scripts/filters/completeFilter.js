export default class CompleteFilter {
    htmlIdentifier = "complete-filter-btn";
    name = "complete filter";
    active = false;
    filter = (toDoItem) => {
        return this.active ? !toDoItem.Complete : true
    }
}