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
    FilterFactory.createFilter('CategoryFilter')
]

export const init = async () => {
    toDoItems = await getAllItems();

    registerFilters();

    generateList();

    PubSub.subscribe("filterListEvent", filterList);
}


const getFilteredIds = () => FilterItems(toDoItems, filters).map((item) => item.Id);

const generateList = () => {
    const itemList = document.getElementById('item-list');

    const filteredIds = getFilteredIds();

    toDoItems.forEach((item) => {
        const newListItem = new ListItem(item);

        if (filteredIds.includes(item.Id)) {
            newListItem.style.display = "block";
        } else {
            newListItem.style.display = "none";
        }
        
        itemList.appendChild(newListItem);
    });
}

//How do we test this kind of stuff?! Karma?
//abstract hiding and showing of items so we can create a mock/sub and check calls? hmmm not sure
const filterList = () => {
    const filteredIds = getFilteredIds();

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