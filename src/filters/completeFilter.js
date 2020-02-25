export default class CompleteFilter {
    htmlIdentifier;
    name;
    active;
    filter;
    constructor({isActive}) {
        this.htmlIdentifier = "complete-filter-btn";
        this.name = "complete filter";
        this.active = isActive;
        this.filter = (toDoItem) => {
            return this.active ? !toDoItem.Complete : true
        }
    }
}