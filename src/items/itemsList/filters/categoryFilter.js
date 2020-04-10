import {
    getAllCategories
} from '../../../services/categoryService.js'

export default class CategoryFilter {
    htmlIdentifier;
    name;
    filter;
    value;
    type;
    options;
    asyncConnectedCallback;
    constructor(defaultValue = 'All') {
        this.type = "select";
        this.htmlIdentifier = "category-filter-select";
        this.name = "category filter";
        this.value = defaultValue;
        this.options = [{
            //this is sooo wrong, should deffo be same type!
            value: 'All',
            display: 'All'
        }];

        this.filter = (toDoItem) => {
            return this.value != 'All' ? toDoItem.CategoryId == this.value : true;
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