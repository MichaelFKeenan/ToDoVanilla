import template from './template.html';
import { toggleItemComplete, deleteItem } from '../itemsService.js'
import PubSub from '../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ListItem extends HTMLElement {
  CategoryEl;
  NameEl;
  DecsriptionEl;
  CompleteButtonEl;
  CompleteButtonDisplayEl;
  DeleteButtonEl;
  PriorityEl;
  Item;

  constructor(itemData) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.Item = itemData;

    this.className = 'toDoItem';
    this.attributes.Id = this.Item.Id

    this.NameEl = shadow.getElementById('item__name');
    if (this.NameEl === null) {
      return;
    }
    this.NameEl.textContent = this.Item.Name;

    this.DescriptionEl = shadow.getElementById('item__description');
    if (this.DescriptionEl === null) {
      return;
    }
    this.DescriptionEl.textContent = this.Item.Description;

    this.CategoryEl = shadow.getElementById('item__category');
    if (this.CategoryEl === null) {
      return;
    }
    this.CategoryEl.textContent = this.Item.CategoryName;

    this.PriorityEl = shadow.getElementById('item__priority');
    if (this.PriorityEl === null) {
      return;
    }

    this.CompleteButtonEl = shadow.getElementById('item-complete-btn');
    if (this.CompleteButtonEl === null) {
      return;
    }
    
    this.CompleteButtonDisplayEl = shadow.getElementById('item-complete-btn__display');
    if (this.CompleteButtonDisplayEl === null) {
      return;
    }

    this.DeleteButtonEl = shadow.getElementById('item-delete-btn');
    if (this.DeleteButtonEl === null) {
      return;
    }
    this.PriorityEl.textContent = this.Item.Priority.toString();

    this.updateCompleteElAndBtnText();

    //move the guts of this into a function out of constructor
    this.CompleteButtonEl.addEventListener('click', async () => {
      
      this.Item.Complete = !this.Item.Complete;

      //do something with this response?
      var res = await toggleItemComplete(this.Item.Id, this.Item.Complete);
      if(res.status == 200){
        //may be better to totally re-do list instead
        this.updateCompleteElAndBtnText();
        PubSub.publish("filterListEvent");
      }
      else {
        alert('uh ooohhh')
      }
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
    this.CompleteButtonDisplayEl.textContent = this.Item.Complete === true ? 'clear' : 'done';
  }
}
window.customElements.define('list-item', ListItem);
