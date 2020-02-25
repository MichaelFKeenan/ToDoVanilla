import HighPriorityFilter from './filters/highPriorityFilter.js'
import CompleteFilter from './filters/completeFilter.js'
import FilterItems from './filters/filterService.js'
import { getAllItems } from './itemsService.js'
import { ListItem } from './listItem/listItem.js';
import { FilterButton } from './filters/filterButton/filterButton.js';

let toDoItems = []

const filters = [new HighPriorityFilter(), new CompleteFilter()]

export const init = async () => {
    toDoItems = await getAllItems();

    registerFilters();

    generateList();
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    itemList.innerHTML = '';

    toDoItems.forEach((item) => {
        const newListItem = new ListItem(item);
        itemList.appendChild(newListItem);
    });
}

//How do we test this kind of stuff?!
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
        //can we use a template here? that has classes for styling etc? orrrr web components?
        const filterBtn = new FilterButton(filter, filterList);
        filtersContainer.appendChild(filterBtn);
    })
}

const buildFilterText = (filter) => filter.name + (filter.active ? ' on' : ' off');
