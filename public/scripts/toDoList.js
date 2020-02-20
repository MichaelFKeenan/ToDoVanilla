
// get these from json file
// populate on construction/init
const toDoItems = [
    {
        "Name": "item one name",
        "Complete": true,
        "Priority": 1
    },
    {
        "Name": "item two name",
        "Complete": false,
        "Priority": 3
    },
    {
        "Name": "item three name",
        "Complete": false,
        "Priority": 2
    }
]

// move these
// implement interface?
class HighPriorityFilter {
    name = "highPriorityFilter";
    htmlIdentifier = "high-priority-filter-btn";
    active = false;
    filter = (toDoItem) => {
        return this.active ? toDoItem.Priority >= 3 : true
    }
}

class CompleteFilter {
    name = "completeFilter";
    htmlIdentifier = "complete-filter-btn";
    active = false;
    filter = (toDoItem) => {
        return this.active ? !toDoItem.Complete : true
    }
}

export const init = () => {
    registerFilters();

    generateList();
}

const getFilteredItems = () => {
    const filteredResults = toDoItems.filter(item => {
        // only do active filters?
        return filters.every(filter => filter.filter(item));
    })
    return filteredResults;
}

const generateList = () => {
    const itemList = document.getElementById('item-list');

    itemList.innerHTML = '';
    const filteredItems = getFilteredItems();
    filteredItems.forEach((item) => {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = item.Name;
        itemList.appendChild(newListItem);
    });
}

const highPriorityFilter = new HighPriorityFilter();
const completeFilter = new CompleteFilter();

const filters = [highPriorityFilter, completeFilter]

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