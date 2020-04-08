import template from './template.html';
import {
  getAllCategories
} from '../../services/categoryService.js'
import {
  addItem
} from '../../services/itemsService.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ItemForm extends HTMLElement {
  submitBtn;
  priorityInput;
  priorityInputValueDisplay;
  categorySelect;
  effortInput;
  effortInputValueDisplay;
  shadow;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(templateEl.content.cloneNode(true));

    this.priorityInput = this.shadow.getElementById('item-priority');
    this.priorityInputValueDisplay = this.shadow.getElementById('item-priority-value-display');
    this.categorySelect = this.shadow.getElementById('category-select');
    this.effortInput = this.shadow.getElementById('item-effort');
    this.effortInputValueDisplay = this.shadow.getElementById('item-effort-value-display');
    this.submitBtn = this.shadow.getElementById('item-submit');
  }

  async connectedCallback() {
    await this.populateCategoriesDropdown();

    this.updateItemPriorityValueDisplay();
    this.updateItemEffortValueDisplay();

    this.priorityInput.addEventListener('change', this.updateItemPriorityValueDisplay);
    this.effortInput.addEventListener('change', this.updateItemEffortValueDisplay);

    this.submitBtn.addEventListener('click', this.submitForm);
  }

  populateCategoriesDropdown = async () => {
    const categories = await getAllCategories();

    categories.forEach(option => {
      const newOptionEl = document.createElement('option');
      newOptionEl.innerHTML = option.Name;
      newOptionEl.value = option.Id;
      this.categorySelect.appendChild(newOptionEl);
    });
  }

  updateItemPriorityValueDisplay = () => {
    this.priorityInputValueDisplay.innerHTML = this.priorityInput.value;
  }

  updateItemEffortValueDisplay = () => {
    this.effortInputValueDisplay.innerHTML = this.effortInput.value;
  }

  submitForm = async () => {
    this.submitBtn.disabled = true;
    //validation?
    const nameValue = this.shadow.getElementById('item-name').value;
    const priorityValue = this.shadow.getElementById('item-priority').value;
    const categorySelectValue = this.shadow.getElementById('category-select').value;
    const descriptionValue = this.shadow.getElementById('item-description').value;
    const effortValue = this.shadow.getElementById('item-effort').value;
    const completeByValue = this.shadow.getElementById('complete-by').value;
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
    if (res.status == 200) {
      window.location.replace("/")
    } else {
      alert('aaaaah an error! tell michael!')
    };
    this.submitBtn.disabled = false;
  }
}

window.customElements.define('item-form', ItemForm);