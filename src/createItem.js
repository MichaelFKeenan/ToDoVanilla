import { addItem } from './itemsService.js'
import { getAllCategories } from './categoryService.js'

let submitBtn;
let priorityInput;
let priorityInputValueDisplay;
let categorySelect;

export const init = async () => {
    submitBtn = document.getElementById('item-submit');
    priorityInput = document.getElementById('item-priority');
    priorityInputValueDisplay = document.getElementById('item-priority-value-display');
    categorySelect = document.getElementById('category-select');
    
    updateItemPriorityValueDisplay();
    
    priorityInput.addEventListener('change', updateItemPriorityValueDisplay)

    submitBtn.addEventListener('click', submitForm)

    await populateCategoriesDropdown();
}

const populateCategoriesDropdown = async () => {
    const categories = await getAllCategories();

    categories.forEach(option => {
      const newOptionEl = document.createElement('option');
      newOptionEl.innerHTML = option.Name;
      newOptionEl.value = option.Id;
      categorySelect.appendChild(newOptionEl);
    });
}

const updateItemPriorityValueDisplay = () => {
    priorityInputValueDisplay.innerHTML = priorityInput.value;
}

const submitForm = async () => {
    submitBtn.disabled = true;
    //validation?
    const nameValue = document.getElementById('item-name').value;
    const priorityValue = priorityInput.value;
    const categorySelectValue = categorySelect.value;
    const descriptionValue = document.getElementById('item-description').value;
    const newItem = {
        Id: null,
        Name: nameValue,
        Complete: false,
        Priority: Number(priorityValue),
        CategoryId: Number(categorySelectValue),
        Description: descriptionValue
    }

    //find a much nicer way to do this!
    var res = await addItem(newItem);
    if(res.status == 200)
    {
        window.location.replace("/")
    }
    else {
        alert('aaaaah an error! tell michael!')
    };
    submitBtn.disabled = false;
}