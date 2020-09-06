import FilterFactory from './filters/filterFactory'
import FilterItems from './filters/filterService'
import {
    getAllItems
} from '../../services/itemsService'
import {
    getCurrentUserId
} from '../../services/sessionService'
import {
    ListItem
} from '../listItem/listItem';
import {
    FilterButton
} from './filters/filterButton/filterButton';
import {
    FilterSelect
} from './filters/filterSelect/filterSelect';
import PubSub from '../../pubsub'
import { AssignedFilterModel } from './filters/assignedFilter'

let toDoItems: Item[] = []

const filters: any[] = [];
let isFilterMenuOpen = false;

let filterMenuContainerEl: any;
let filterMenuRowEl: any;
let menuToggleBtnEl: any;
let menuToggleBtnIconEl: any;
let userId: any;

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

const getFilteredIds = function(): number[]{
    const ids: number[] = FilterItems(toDoItems, filters).map((item: Item) => item.Id);

    return ids;
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    const filteredIds = getFilteredIds();

    toDoItems.forEach((item: Item) => {
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
    const filteredIds: number[] = getFilteredIds();

    const itemsInDom = document.getElementsByClassName('toDoItem');
    for (var i = 0; i < itemsInDom.length; i++) {
        const item = <HTMLElement>itemsInDom[i];
        
        const id = parseInt(item.id);

        if (filteredIds.includes(id)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    }
}

const registerFilters = () => {
    //we can actually test a lot of this file now
    filters.push(FilterFactory.createFilter('AssignedFilter', new AssignedFilterModel(true, userId)))
    filters.push(FilterFactory.createFilter('HighPriorityFilter', false))
    filters.push(FilterFactory.createFilter('CompleteFilter', true))
    filters.push(FilterFactory.createFilter('CategoryFilter'))

    filters.forEach((filter) => {
        let filterEl;
        if (filter.Type == "button") {
            filterEl = new FilterButton(filter);
        }
        if (filter.Type == "select") {
            //need to build this
            //filter should have a list of options as well as selected value
            filterEl = new FilterSelect(filter);
        }
        
        const newCol = document.createElement('div');
        newCol.classList.add('col');
        newCol.classList.add('mb-3');
        newCol.appendChild(filterEl);
        filterMenuRowEl.appendChild(newCol);
    })
}