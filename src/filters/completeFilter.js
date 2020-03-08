export default class CompleteFilter {
    htmlIdentifier;
    name;
    active;
    filter;
    type;
    constructor({isActive}) {
        this.type = "button";
        this.htmlIdentifier = "complete-filter-btn";
        this.name = "complete filter";
        this.active = isActive;
        this.filter = (toDoItem) => {
            return this.active ? !toDoItem.Complete : true
        }
    }
}