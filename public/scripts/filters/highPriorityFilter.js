export default class HighPriorityFilter {
    name = "highPriorityFilter";
    htmlIdentifier = "high-priority-filter-btn";
    active = false;
    filter = (toDoItem) => {
        return this.active ? toDoItem.Priority >= 3 : true
    }
}