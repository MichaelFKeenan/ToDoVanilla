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
        //can we use a template here? that has classes for styling etc? orrrr web components?
        const newListItem = document.createElement('li');
        newListItem.className = "toDoItem";
        newListItem.attributes.itemId = item.Id;
        newListItem.innerHTML = item.Name;
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
        const filterBtn = document.createElement('button');
        filterBtn.id = filter.htmlIdentifier;
        filterBtn.innerHTML = filter.name;
        filterBtn.addEventListener('click', () => filterClick(filter));
        filtersContainer.appendChild(filterBtn);
    })
}

const filterClick = (filter) => {
    filter.active = !filter.active;
    filterList();
}