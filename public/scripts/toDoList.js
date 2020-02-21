import HighPriorityFilter from './filters/highPriorityFilter.js'
import CompleteFilter from './filters/completeFilter.js'
import FilterItems from './filters/filterService.js'
import { getAllItems } from './itemsService.js'

let toDoItems = []

const filters = [new HighPriorityFilter(), new CompleteFilter()]

export const init = async () => {
    toDoItems = await getAllItems();

    registerFilters();

    generateList();
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    //hide elements instead of removing and repopulating dom?
    //does this mean we need to render all of them on page load? probably!
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