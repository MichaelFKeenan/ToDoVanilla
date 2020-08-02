import {
    getAllCategories
} from '../../../services/categoryService'

export default class CategoryFilter implements IFilterSelect {
    HtmlIdentifier: string;
    Name: string;
    Active: boolean;
    Filter: any;
    Type: string;
    Options: any[];
    AsyncConnectedCallback: any;
    Value: string;
    constructor(defaultValue = 'All') {
        this.Type = "select";
        this.HtmlIdentifier = "category-filter-select";
        this.Name = "category filter";
        this.Value = defaultValue;
        this.Options = [{
            //this is sooo wrong, should deffo be same type!
            value: 'All',
            display: 'All'
        }];

        this.Filter = (toDoItem: Item) => {
            //yuck
            return this.Value != 'All' ? toDoItem.CategoryId.toString() == this.Value : true;
        }

        this.AsyncConnectedCallback = async () => {
            const categories = await getAllCategories();

            for (var i = 0; i < categories.length; i++) {
                this.Options.push({
                    //this is sooo wrong, should deffo be same type!
                    value: categories[i].Id,
                    display: categories[i].Name
                })
            }
        }
    }
}