import { addItem } from './itemsService.js'

export const init = async () => {
    const submitBtn = document.getElementById('item-submit');
    const priorityInput = document.getElementById('item-priority');
    const priorityInputValueDisplay = document.getElementById('item-priority-value-display');
    
    const updateItemPriorityValueDisplay = () => {
        priorityInputValueDisplay.innerHTML = priorityInput.value;
    }

    updateItemPriorityValueDisplay();
    
    priorityInput.addEventListener('change', updateItemPriorityValueDisplay)

    submitBtn.addEventListener('click', async () => {
        submitBtn.disabled = true;
        //validation?
        const nameValue = document.getElementById('item-name').value;
        const priorityValue = priorityInput.value;
        const categoryValue = document.getElementById('item-category').value;
        const descriptionValue = document.getElementById('item-description').value;
        const newItem = {
            Id: null,
            Name: nameValue,
            Complete: false,
            Priority: Number(priorityValue),
            CategoryId: Number(categoryValue),
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
    })
}