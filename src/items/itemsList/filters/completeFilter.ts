export default class CompleteFilter implements IFilter {
    HtmlIdentifier: string;
    Name: string;
    Active: boolean;
    Filter: any;
    Type: string;
    constructor(isActive = false) {
        this.Type = "button";
        this.HtmlIdentifier = "complete-filter-btn";
        this.Name = "complete";
        this.Active = isActive;
        this.Filter = (toDoItem: Item) => {
            return this.Active ? !toDoItem.Complete : true
        }
    }
}