export default class HighPriorityFilter {
    htmlIdentifier = "high-priority-filter-btn";
    name = "high priority filter";
    active = false;
    filter = (toDoItem) => {
        return this.active ? toDoItem.Priority >= 3 : true
    }
}