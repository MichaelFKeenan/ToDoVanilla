import template from './template.html';
import { deleteCategory } from '../../services/categoryService.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class ListItem extends HTMLElement {
  NameEl;
  DeleteButtonEl;
  Category;

  constructor(categoryData) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.Category = categoryData;

    this.attributes.Id = this.Category.Id

    if (this.Category.Name !== null) {
      this.NameEl = shadow.getElementById('category__name');
      this.NameEl.textContent = this.Category.Name;
    }

    this.DeleteButtonEl = shadow.getElementById('category-delete-btn');
    if (this.DeleteButtonEl === null) {
      return;
    }

    this.DeleteButtonEl.addEventListener('click', async () => {
      this.DeleteButtonEl.disabled = true;
      var res = await deleteCategory(this.Category.Id);

      if(res.status == 200)
      {
        this.remove();
        return;
      }
      
      alert('aaaaah an error! tell michael!')
      
      this.DeleteButtonEl.disabled = false;
    })
  }
}
window.customElements.define('list-item', ListItem);
