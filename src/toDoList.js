import FilterFactory from './filters/filterFactory.js'
import FilterItems from './filters/filterService.js'
import { getAllItems } from './itemsService.js'
import { ListItem } from './listItem/listItem.js';
import { FilterButton } from './filters/filterButton/filterButton.js';
import PubSub from './pubsub.js'

let toDoItems = []

const filters = [FilterFactory.createFilter('HighPriorityFilter', false), FilterFactory.createFilter('CompleteFilter', false)]

export const init = async () => {
    toDoItems = await getAllItems();

    registerFilters();

    generateList();

    PubSub.subscribe("filterListEvent", filterList)
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    itemList.innerHTML = '';

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
        if(filteredIds.includes(itemsInDom[i].attributes.itemId)){
            itemsInDom[i].style.display = "block";
        }
        else {
            itemsInDom[i].style.display = "none";
        }
    }
}

const registerFilters = () => {
    const filtersContainer = document.getElementById('filters-container');

    filters.forEach((filter) => {
        const filterBtn = new FilterButton(filter);
        filtersContainer.appendChild(filterBtn);
    })
}