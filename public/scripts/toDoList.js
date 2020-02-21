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

    itemList.innerHTML = '';

    toDoItems.forEach((item) => {
        const newListItem = document.createElement('li');
        newListItem.className = "toDoItem";
        newListItem.attributes.itemId = item.Id;
        newListItem.innerHTML = item.Name;
        itemList.appendChild(newListItem);
    });
}

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
    filters.forEach((filter) => {
        const filterBtn = document.getElementById(filter.htmlIdentifier);
        filterBtn.addEventListener('click', () => filterClick(filter));
    })
}

const filterClick = (filter) => {
    filter.active = !filter.active;
    filterList();
}