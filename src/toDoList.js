import FilterFactory from './filters/filterFactory.js'
import FilterItems from './filters/filterService.js'
import {
    getAllItems
} from './itemsService.js'
import {
    ListItem
} from './listItem/listItem.js';
import {
    FilterButton
} from './filters/filterButton/filterButton.js';
import {
    FilterSelect
} from './filters/filterSelect/filterSelect.js';
import PubSub from './pubsub.js'

let toDoItems = []

const filters = [
    FilterFactory.createFilter('HighPriorityFilter', false),
    FilterFactory.createFilter('CompleteFilter', true),
    FilterFactory.createFilter('CategoryFilter', 0)
]

export const init = async () => {
    toDoItems = await getAllItems();

    registerFilters();

    generateList();

    PubSub.subscribe("filterListEvent", filterList);
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    toDoItems.forEach((item) => {
        const newListItem = new ListItem(item);
        itemList.appendChild(newListItem);
    });
}

//How do we test this kind of stuff?! Karma?
const filterList = () => {
    const filteredIds = FilterItems(toDoItems, filters).map((item) => item.Id);

    const itemsInDom = document.getElementsByClassName('toDoItem');

    for (var i = 0; i < itemsInDom.length; i++) {
        if (filteredIds.includes(itemsInDom[i].attributes.itemId)) {
            itemsInDom[i].style.display = "block";
        } else {
            itemsInDom[i].style.display = "none";
        }
    }
}

const registerFilters = () => {
    const filtersContainer = document.getElementById('filters-container');

    filters.forEach((filter) => {
        console.log(filter)
        let filterEl;
        if(filter.type == "button"){
            filterEl = new FilterButton(filter);
        }
        if(filter.type == "select"){
            //need to build this
            //filter should have a list of options as well as selected value
            filterEl = new FilterSelect(filter);
        }
        filtersContainer.appendChild(filterEl);
    })
}