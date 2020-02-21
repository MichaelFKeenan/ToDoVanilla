import HighPriorityFilter from './filters/highPriorityFilter.js'
import CompleteFilter from './filters/completeFilter.js'
import FilterItems from './filters/filterService.js'
import { getAllItems } from './itemsService.js'

//make this a class and move to constructor?
const toDoItems = await getAllItems();

const filters = [new HighPriorityFilter(), new CompleteFilter()]

export const init = () => {
    registerFilters();

    generateList();
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    //hide elements instead of removing and repopulating dom?
    itemList.innerHTML = '';

    const filteredItems = FilterItems(toDoItems, filters);
    
    filteredItems.forEach((item) => {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = item.Name;
        itemList.appendChild(newListItem);
    });
}

const registerFilters = () => {
    filters.forEach((filter) => {
        const filterBtn = document.getElementById(filter.htmlIdentifier);
        filterBtn.addEventListener('click', () => filterClick(filter));
    })
}

const filterClick = (filter) => {
    filter.active = !filter.active;
    generateList();
}