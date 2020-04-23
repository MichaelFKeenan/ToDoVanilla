export default class CompleteFilter {
    htmlIdentifier;
    name;
    active;
    filter;
    type;
    userId;
    constructor({isActive = false, userId}) {
        this.type = "button";
        this.htmlIdentifier = "assigned-filter-btn";
        this.name = "assigned";
        this.active = isActive;
        this.filter = (toDoItem) => {
            return this.active ? toDoItem.AssignedToUserId == userId : true
        }
    }
}