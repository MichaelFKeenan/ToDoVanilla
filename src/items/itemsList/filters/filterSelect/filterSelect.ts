import template from './template.html';
import PubSub from '../../../../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FilterSelect extends HTMLElement {
  SelectEl: HTMLElement;
  Filter: IFilterSelect;

  constructor(filter: IFilterSelect) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.SelectEl = shadow.getElementById('root');

    this.Filter = filter;

    this.SelectEl.id = filter.HtmlIdentifier;
  }

  async connectedCallback(){
    if(this.Filter.AsyncConnectedCallback != null){
      await this.Filter.AsyncConnectedCallback();
    }

    this.Filter.Options.forEach(option => {
      const newOptionEl = document.createElement('option');
      newOptionEl.innerHTML = option.display;
      newOptionEl.value = option.value;
      this.SelectEl.appendChild(newOptionEl);
    });

    this.SelectEl.addEventListener('change', (event) => {
      let eventTarget: any = event.target
      this.Filter.Value = eventTarget.value;
      PubSub.publish("filterListEvent")
    })
  }
}
window.customElements.define('filter-select', FilterSelect);
