export default class HighPriorityFilter implements IFilter {
    HtmlIdentifier: string;
    Name: string;
    Active: boolean;
    Filter: any;
    Type: string;
    constructor(isActive = false) {
        this.Type = "button";
        this.HtmlIdentifier = "high-priority-filter-btn";
        this.Name = "high priority";
        this.Active = isActive;
        this.Filter = (toDoItem: Item) => {
            return this.Active ? toDoItem.Priority >= 2 : true
        }
    }
}