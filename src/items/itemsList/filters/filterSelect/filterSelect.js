import template from './template.html';
import PubSub from '../../../../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FilterSelect extends HTMLElement {
  SelectEl;
  Filter;

  constructor(filter) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.SelectEl = shadow.getElementById('root');
    this.Filter = filter;

    this.SelectEl.id = filter.htmlIdentifier;
  }

  async connectedCallback(){
    if(this.Filter.asyncConnectedCallback){
      await this.Filter.asyncConnectedCallback();
    }

    this.Filter.options.forEach(option => {
      const newOptionEl = document.createElement('option');
      newOptionEl.innerHTML = option.display;
      newOptionEl.value = option.value;
      this.SelectEl.appendChild(newOptionEl);
    });

    this.SelectEl.addEventListener('change', (event) => {
      this.Filter.value = event.target.value;
      PubSub.publish("filterListEvent")
    })
  }
}
window.customElements.define('filter-select', FilterSelect);
