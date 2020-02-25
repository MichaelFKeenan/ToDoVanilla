export default class HighPriorityFilter {
    htmlIdentifier;
    name;
    active;
    filter;
    constructor({isActive}) {
        this.htmlIdentifier = "high-priority-filter-btn";
        this.name = "high priority filter";
        this.active = isActive;
        this.filter = (toDoItem) => {
            return this.active ? toDoItem.Priority >= 3 : true
        }
    }
}