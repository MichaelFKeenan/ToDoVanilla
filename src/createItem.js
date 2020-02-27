import { addItem } from './itemsService.js'

export const init = async () => {
    const submitBtn = document.getElementById('item-submit');
    submitBtn.addEventListener('click', async () => {
        //validation?
        const nameValue = document.getElementById('item-name').value;
        const priorityValue = document.getElementById('item-priority').value;
        const newItem = {
            Id: null,
            Name: nameValue,
            Complete: false,
            Priority: Number(priorityValue)
        }
        await addItem(newItem);
    })
}