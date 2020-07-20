import { addCategory } from '../services/categoryService'

let submitBtn;

export const init = async () => {
    submitBtn = document.getElementById('category-submit');
    
    submitBtn.addEventListener('click', submitForm);
}

const submitForm = async () => {
    submitBtn.disabled = true;
    //validation?
    const nameValue = document.getElementById('category-name').value;
    const newCategory = {
        Id: null,
        Name: nameValue
    }

    //find a much nicer way to do this!
    var res = await addCategory(newCategory);
    if(res.status == 200)
    {
        window.location.replace("/categories/")
    }
    else {
        alert('aaaaah an error! tell michael!')
    };
    submitBtn.disabled = false;
}