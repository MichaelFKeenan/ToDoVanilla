export default class HighPriorityFilter {
    htmlIdentifier = "high-priority-filter-btn";
    active = false;
    filter = (toDoItem) => {
        return this.active ? toDoItem.Priority >= 3 : true
    }
}