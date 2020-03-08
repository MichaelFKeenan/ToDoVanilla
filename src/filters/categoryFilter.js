export default class CategoryFilter {
    htmlIdentifier;
    name;
    filter;
    value;
    type;
    options;
    constructor({value}) {
        this.type = "select";
        this.htmlIdentifier = "category-filter-select";
        this.name = "category filter";
        this.value = value;

        //do this in a better way, like get from service, have some select options builder?
        this.options = [
            {
                value: 0,
                display: 'misc'
            },
            {
                value: 1,
                display: 'projects'
            }
        ]
        this.filter = (toDoItem) => {
            console.log(this.value)
            return this.value != 'All' ? toDoItem.CategoryId == this.value : true;
        }
    }
}