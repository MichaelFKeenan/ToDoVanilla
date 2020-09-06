export class AssignedFilterModel {
    IsActive: boolean;
    UserId: number;
    constructor(isActive: boolean, UserId: number) {
        this.IsActive = isActive;
        this.UserId = UserId;
    }
}

export default class AssignedFilter implements IFilter {
    HtmlIdentifier: string;
    Name: string;
    Active: boolean;
    Filter: any;
    //create a type/enum for this
    Type: string;
    constructor(assignedFilterModel: AssignedFilterModel) {
        this.Type = "button";
        this.HtmlIdentifier = "assigned-filter-btn";
        this.Name = "assigned";
        this.Active = assignedFilterModel.IsActive;
        this.Filter = (toDoItem: Item) => {
            return this.Active ? toDoItem.AssignedToUserId == assignedFilterModel.UserId : true
        }
    }
}