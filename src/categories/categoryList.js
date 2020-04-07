import {
    getAllCategories
} from '../services/categoryService.js'
import {
    ListItem
} from './listItem/listItem.js';
// import PubSub from '../pubsub.js'

let categoryItems = []

export const init = async () => {
    categoryItems = await getAllCategories();

    generateList();

    // PubSub.subscribe("filterListEvent", filterList);
}

const generateList = () => {
    const categoryList = document.getElementById('category-list');

    categoryItems.forEach((category) => {
        const newCategoryListItem = new ListItem(category);

        categoryList.appendChild(newCategoryListItem);
    });
}