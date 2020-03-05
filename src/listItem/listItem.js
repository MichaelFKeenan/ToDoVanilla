import template from './template.html';
import { updateItem } from '../itemsService.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ListItem extends HTMLElement {
  NameEl;
  CompleteEl;
  PriorityEl;
  CompleteButtonEl
  Item;

  constructor(itemData) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.Item = itemData;

    this.className = 'toDoItem';
    this.attributes.itemId = this.Item.Id

    this.NameEl = shadow.getElementById('item__name');
    if (this.NameEl === null) {
      return;
    }
    this.NameEl.textContent = this.Item.Name;

    this.CompleteEl = shadow.getElementById('item__complete');
    if (this.CompleteEl === null) {
      return;
    }

    this.PriorityEl = shadow.getElementById('item__priority');
    if (this.PriorityEl === null) {
      return;
    }

    this.CompleteButtonEl = shadow.getElementById('item-complete-btn');
    if (this.CompleteButtonEl === null) {
      return;
    }

    this.updateCompleteElAndBtnText();
    this.PriorityEl.textContent = this.Item.Priority.toString();

    this.CompleteButtonEl.addEventListener('click', async () => {
      //create a new image instead i think
      this.Item.Complete = !this.Item.Complete;
      //do something with this response?
      await updateItem(this.Item);
      this.updateCompleteElAndBtnText();
    })
  }

  updateCompleteElAndBtnText = () => {
    this.CompleteEl.textContent = this.Item.Complete === true ? 'complete' : 'incomplete';
    this.CompleteButtonEl.textContent = this.Item.Complete === true ? 'mark as incomplete' : 'mark as complete';
  }
}
window.customElements.define('list-item', ListItem);
