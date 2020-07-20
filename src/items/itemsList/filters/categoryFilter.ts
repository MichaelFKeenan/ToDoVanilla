import {
    getAllCategories
} from '../../../services/categoryService'

export default class CategoryFilter implements IFilter {
    HtmlIdentifier: string;
    Name: string;
    Active: boolean;
    Filter: any;
    Type: string;
    options: any[];
    asyncConnectedCallback: any;
    value: string;
    constructor(defaultValue = 'All') {
        this.Type = "select";
        this.HtmlIdentifier = "category-filter-select";
        this.Name = "category filter";
        this.value = defaultValue;
        this.options = [{
            //this is sooo wrong, should deffo be same type!
            value: 'All',
            display: 'All'
        }];

        this.Filter = (toDoItem: Item) => {
            //yuck
            return this.value != 'All' ? toDoItem.CategoryId.toString() == this.value : true;
        }

        this.asyncConnectedCallback = async () => {
            const categories = await getAllCategories();

            for (var i = 0; i < categories.length; i++) {
                this.options.push({
                    //this is sooo wrong, should deffo be same type!
                    value: categories[i].Id,
                    display: categories[i].Name
                })
            }
        }
    }
}