import { addItem } from './itemsService.js'

export const init = async () => {
    const submitBtn = document.getElementById('item-submit');
    submitBtn.addEventListener('click', async () => {
        //validation?
        const nameValue = document.getElementById('item-name').value;
        const priorityValue = document.getElementById('item-priority').value;
        const categoryValue = document.getElementById('item-category').value;
        const newItem = {
            Id: null,
            Name: nameValue,
            Complete: false,
            Priority: Number(priorityValue),
            CategoryId: Number(categoryValue)
        }
        //do something with this response?
        //handle errors, or return to list with success message
        await addItem(newItem);
    })
}