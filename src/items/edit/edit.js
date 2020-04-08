import '../itemForm/itemForm.js'

const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');

const container = document.getElementById('form-container');
container.innerHTML = `<item-form item-id='${idParam}'></item-form>`;