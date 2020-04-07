import { addItem } from '../services/itemsService.js'
import { getAllCategories } from '../services/categoryService.js'

let submitBtn;
let priorityInput;
let priorityInputValueDisplay;
let categorySelect;
let effortInput;
let effortInputValueDisplay;

export const init = async () => {
    submitBtn = document.getElementById('item-submit');
    priorityInput = document.getElementById('item-priority');
    priorityInputValueDisplay = document.getElementById('item-priority-value-display');
    categorySelect = document.getElementById('category-select');
    effortInput = document.getElementById('item-effort');
    effortInputValueDisplay = document.getElementById('item-effort-value-display');
    
    updateItemPriorityValueDisplay();
    updateItemEffortValueDisplay();
    
    priorityInput.addEventListener('change', updateItemPriorityValueDisplay);
    effortInput.addEventListener('change', updateItemEffortValueDisplay);

    submitBtn.addEventListener('click', submitForm);

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

const updateItemEffortValueDisplay = () => {
    effortInputValueDisplay.innerHTML = effortInput.value;
}

const submitForm = async () => {
    submitBtn.disabled = true;
    //validation?
    const nameValue = document.getElementById('item-name').value;
    const priorityValue = priorityInput.value;
    const categorySelectValue = categorySelect.value;
    const descriptionValue = document.getElementById('item-description').value;
    const effortValue = effortInput.value;
    const completeByValue = document.getElementById('complete-by').value;
    const newItem = {
        Id: null,
        Name: nameValue,
        Complete: false,
        Priority: Number(priorityValue),
        CategoryId: Number(categorySelectValue),
        Description: descriptionValue,
        Effort: Number(effortValue),
        CompleteBy: completeByValue
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