import template from './template.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ListItem extends HTMLElement {
  NameEl;
  CompleteEl;
  PriorityEl;

  constructor(itemData) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.className = 'toDoItem';
    this.attributes.itemId = itemData.Id

    this.nameEl = shadow.getElementById('item__name');
    if (this.nameEl === null) {
      return;
    }
    this.nameEl.textContent = itemData.Name;

    this.completeEl = shadow.getElementById('item__complete');
    if (this.completeEl === null) {
      return;
    }

    this.priorityEl = shadow.getElementById('item__priority');
    if (this.priorityEl === null) {
      return;
    }

    this.completeEl.textContent = itemData.Complete === true ? 'complete' : 'incomplete';
    this.priorityEl.textContent = itemData.Priority.toString();
  }
}
window.customElements.define('list-item', ListItem);
