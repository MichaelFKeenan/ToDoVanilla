import { addItem } from './itemsService.js'

export const init = async () => {
    const submitBtn = document.getElementById('item-submit');
    submitBtn.addEventListener('click', async () => {
        submitBtn.disabled = true;
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