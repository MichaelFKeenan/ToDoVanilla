export default class CategoryFilter {
    htmlIdentifier;
    name;
    filter;
    value;
    type;
    options;
    constructor(defaultValue = 'All') {
        this.type = "select";
        this.htmlIdentifier = "category-filter-select";
        this.name = "category filter";
        this.value = defaultValue;

        //do this in a better way, like get from service, have some select options builder?
        this.options = [
            {
                //this is sooo wrong, should deffo be same type!
                value: 'All',
                display: 'All'
            },
            {
                value: '0',
                display: 'misc'
            },
            {
                value: '1',
                display: 'projects'
            }
        ]
        this.filter = (toDoItem) => {
            return this.value != 'All' ? toDoItem.CategoryId == this.value : true;
        }
    }
}