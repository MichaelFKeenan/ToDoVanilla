export default class HighPriorityFilter {
    htmlIdentifier;
    name;
    active;
    type;
    constructor({isActive}) {
        this.type = "button";
        this.htmlIdentifier = "high-priority-filter-btn";
        this.name = "high priority filter";
        this.active = isActive;
        this.filter = (toDoItem) => {
            return this.active ? toDoItem.Priority >= 3 : true
        }
    }
}