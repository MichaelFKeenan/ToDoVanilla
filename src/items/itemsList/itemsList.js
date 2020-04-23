import FilterFactory from './filters/filterFactory.js'
import FilterItems from './filters/filterService.js'
import {
    getAllItems
} from '../../services/itemsService.js'
import {
    getCurrentUserId
} from '../../services/sessionService'
import {
    ListItem
} from '../listItem/listItem.js';
import {
    FilterButton
} from './filters/filterButton/filterButton.js';
import {
    FilterSelect
} from './filters/filterSelect/filterSelect.js';
import PubSub from '../../pubsub.js'

let toDoItems = []

const filters = [];
let isFilterMenuOpen = false;

let filterMenuContainerEl;
let filterMenuRowEl;
let menuToggleBtnEl;
let menuToggleBtnIconEl;
let userId;

export const init = async () => {
    filterMenuContainerEl = document.getElementById('filters-container');
    filterMenuRowEl = document.getElementById('filters-row');
    menuToggleBtnEl = document.getElementById('toggle-menu-btn');
    menuToggleBtnIconEl = document.getElementById('toggle-menu-btn-icon');

    toDoItems = await getAllItems();
    //going to move when more sort types introduced
    //obviosuly test sorts too
    toDoItems.sort((a, b) => b.Priority - a.Priority)

    userId = await getCurrentUserId();

    registerFilters();

    generateList();

    PubSub.subscribe("filterListEvent", filterList);

    menuToggleBtnEl.addEventListener('click', toggleFilterMenu);
}

const toggleFilterMenu = () => {
    if (isFilterMenuOpen) {
        //use a class for this stuff instead?
        filterMenuContainerEl.classList.add('hidden');
        menuToggleBtnIconEl.innerHTML = 'keyboard_arrow_down'
    } else {
        filterMenuContainerEl.classList.remove('hidden');
        menuToggleBtnIconEl.innerHTML = 'keyboard_arrow_up'
    }
    isFilterMenuOpen = !isFilterMenuOpen;
}

const getFilteredIds = () => FilterItems(toDoItems, filters).map((item) => item.Id);

const generateList = () => {
    const itemList = document.getElementById('item-list');

    const filteredIds = getFilteredIds();

    toDoItems.forEach((item) => {
        const newListItem = new ListItem(item);

        if (filteredIds.includes(item.Id)) {
            newListItem.classList.remove('hidden');
        } else {
            newListItem.classList.add('hidden');
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
        if (filteredIds.includes(itemsInDom[i].attributes.Id)) {
            itemsInDom[i].classList.remove('hidden');
        } else {
            itemsInDom[i].classList.add('hidden');
        }
    }
}

const registerFilters = () => {
    filters.push(FilterFactory.createFilter('AssignedFilter', {userId}))
    filters.push(FilterFactory.createFilter('HighPriorityFilter', false))
    filters.push(FilterFactory.createFilter('CompleteFilter', true))
    filters.push(FilterFactory.createFilter('CategoryFilter'))

    filters.forEach((filter) => {
        let filterEl;
        if (filter.type == "button") {
            filterEl = new FilterButton(filter);
        }
        if (filter.type == "select") {
            //need to build this
            //filter should have a list of options as well as selected value
            filterEl = new FilterSelect(filter);
        }
        const newCol = document.createElement('div');
        newCol.classList.add('col');
        newCol.appendChild(filterEl);
        filterMenuRowEl.appendChild(newCol);
    })
}