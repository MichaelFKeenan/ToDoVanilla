
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

class highPriorityFilter {
    name = "highPriorityFilter"
    active = false;
    filter = (toDoItem) => {
        return this.active ? toDoItem.Priority >= 3 : true
    }
}

class completeFilter {
    name = "completeFilter"
    active = false;
    filter = (toDoItem) => {
        return this.active ? !toDoItem.Complete : true
    }
}

const filters = [new highPriorityFilter(), new completeFilter()]

const getFilteredItems = () => {
    const filteredResults = toDoItems.filter(item => {
        // only do active filters?
        return filters.every(filter => filter.filter(item));
    })
    return filteredResults;
}

const itemList = document.getElementById('item-list');

export const generateList = () => {
    itemList.innerHTML = '';
    const filteredItems = getFilteredItems();
    filteredItems.forEach((item) => {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = item.Name;
        itemList.appendChild(newListItem);
    });
}