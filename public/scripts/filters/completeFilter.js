export default class CompleteFilter {
    name = "completeFilter";
    htmlIdentifier = "complete-filter-btn";
    active = false;
    filter = (toDoItem) => {
        return this.active ? !toDoItem.Complete : true
    }
}