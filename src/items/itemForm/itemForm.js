import template from './template.html';
import {
  getAllCategories
} from '../../services/categoryService.js'
import {
  getUsers
} from '../../services/usersService.js'
import {
  addItem,
  editItem,
  getItem
} from '../../services/itemsService.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ItemForm extends HTMLElement {
  submitBtn;
  priorityInput;
  priorityInputValueDisplay;
  categorySelect;
  assignSelect;
  effortInput;
  effortInputValueDisplay;
  shadow;
  id;

  constructor() {
    super();
    this.shadow = this.attachShadow({
      mode: 'closed'
    });
    this.shadow.appendChild(templateEl.content.cloneNode(true));

    this.id = this.getAttribute("item-id");

    this.priorityInput = this.shadow.getElementById('item-priority');
    this.priorityInputValueDisplay = this.shadow.getElementById('item-priority-value-display');
    this.categorySelect = this.shadow.getElementById('category-select');
    this.assignSelect = this.shadow.getElementById('assign-select');
    this.effortInput = this.shadow.getElementById('item-effort');
    this.effortInputValueDisplay = this.shadow.getElementById('item-effort-value-display');
    this.submitBtn = this.shadow.getElementById('item-submit');
  }

  async connectedCallback() {
    await this.populateCategoriesDropdown();
    await this.populateUsersDropdown();

    this.effortInput.addEventListener('change', this.updateItemEffortValueDisplay);

    this.submitBtn.addEventListener('click', this.submitForm);

    if (this.id) {
      try {
        let item = await getItem(this.id)
        this.setItemValues(item);
      } catch (ex) {
        alert('this item does not exist!')
        //redirect or something?
      }
    }

    this.updateItemEffortValueDisplay();
  }

  setItemValues = (item) => {
    this.shadow.getElementById('item-name').value = item.Name;
    const selectedRadio = this.shadow.querySelector(`input[name="itemPriorityRadio"][value="${item.Priority > 2 ? 2 : item.Priority}"]`);
    selectedRadio.checked = true;
    this.shadow.getElementById('category-select').value = item.CategoryId;
    this.shadow.getElementById('assign-select').value = item.AssignedToUserId;
    this.shadow.getElementById('item-description').value = item.Description;
    this.shadow.getElementById('item-effort').value = item.Effort;
    if (item.CompleteBy !== null) {
      const isoDate = new Date(item.CompleteBy)

      const dateString = `${isoDate.getFullYear()}-${isoDate.getMonth() < 10 ? '0' : ''}${isoDate.getMonth()}-${isoDate.getDate()}`

      this.shadow.getElementById('complete-by').value = dateString;
    }
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

  populateUsersDropdown = async () => {
    const users = await getUsers();

    const defaultOptionEl = document.createElement('option');
    defaultOptionEl.innerHTML = "None";
    defaultOptionEl.value = null;
    this.assignSelect.appendChild(defaultOptionEl);

    users.forEach(option => {
      const newOptionEl = document.createElement('option');
      newOptionEl.innerHTML = option.DisplayName;
      newOptionEl.value = option.Id;
      this.assignSelect.appendChild(newOptionEl);
    });
  }

  updateItemEffortValueDisplay = () => {
    this.effortInputValueDisplay.innerHTML = this.effortInput.value;
  }

  submitForm = async () => {
    this.submitBtn.disabled = true;
    //validation?
    const nameValue = this.shadow.getElementById('item-name').value;
    const priorityValue = this.shadow.querySelector('input[name="itemPriorityRadio"]:checked').value
    const categorySelectValue = this.shadow.getElementById('category-select').value;
    const assignedUserSelectValue = this.shadow.getElementById('assign-select').value;
    const descriptionValue = this.shadow.getElementById('item-description').value;
    const effortValue = this.shadow.getElementById('item-effort').value;
    const completeByValue = this.shadow.getElementById('complete-by').value;
    const item = {
      Id: this.id,
      Name: nameValue,
      Complete: false,
      Priority: Number(priorityValue),
      CategoryId: Number(categorySelectValue),
      AssignedUserId: Number(assignedUserSelectValue),
      Description: descriptionValue,
      Effort: Number(effortValue),
      CompleteBy: completeByValue
    }

    //find a much nicer way to do this!
    let res;

    if (this.id) {
      res = await editItem(item);
    } else {
      res = await addItem(item);
    }

    if (res.status == 200) {
      window.location.replace("/")
    } else {
      alert('aaaaah an error! tell michael!')
    };
    this.submitBtn.disabled = false;
  }
}

window.customElements.define('item-form', ItemForm);