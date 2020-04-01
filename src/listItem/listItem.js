import template from './template.html';
import { updateItem, deleteItem } from '../itemsService.js'
import PubSub from '../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ListItem extends HTMLElement {
  NameEl;
  CompleteButtonEl;
  DeleteButtonEl;
  PriorityEl;
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

    this.PriorityEl = shadow.getElementById('item__priority');
    if (this.PriorityEl === null) {
      return;
    }

    this.CompleteButtonEl = shadow.getElementById('item-complete-btn');
    if (this.CompleteButtonEl === null) {
      return;
    }

    this.DeleteButtonEl = shadow.getElementById('item-delete-btn');
    if (this.DeleteButtonEl === null) {
      return;
    }

    this.updateCompleteElAndBtnText();
    this.PriorityEl.textContent = this.Item.Priority.toString();

    //move the guts of this into a function out of constructor
    this.CompleteButtonEl.addEventListener('click', async () => {
      //create a new item instead i think
      this.Item.Complete = !this.Item.Complete;
      //do something with this response?
      await updateItem(this.Item);
      this.updateCompleteElAndBtnText();
      //may be better to totally re-do list instead
      PubSub.publish("filterListEvent");
    })

    //move the guts of this into a function out of constructor
    this.DeleteButtonEl.addEventListener('click', async () => {
      this.DeleteButtonEl.disabled = true;
      var res = await deleteItem(this.Item.Id);

      if(res.status == 200)
      {
        this.remove();
        return;
      }
      
      alert('aaaaah an error! tell michael!')
      
      this.DeleteButtonEl.disabled = false;
    })
  }

  updateCompleteElAndBtnText = () => {
    this.CompleteButtonEl.textContent = this.Item.Complete === true ? 'Complete' : 'Incomplete';
  }
}
window.customElements.define('list-item', ListItem);
