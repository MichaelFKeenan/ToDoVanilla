import template from './template.html';
import PubSub from '../../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FilterSelect extends HTMLElement {
  SelectEl;

  constructor(filter) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.SelectEl = shadow.getElementById('root');

    this.SelectEl.id = filter.htmlIdentifier;
    filter.options.forEach(option => {
      const newOptionEl = document.createElement('option');
      newOptionEl.innerHTML = option.display;
      newOptionEl.value = option.value;
      this.SelectEl.appendChild(newOptionEl);
    });

    //add an option for each filter.options

    this.SelectEl.addEventListener('change', (event) => {
      filter.value = event.target.value;
      PubSub.publish("filterListEvent")
    })
  }
}
window.customElements.define('filter-select', FilterSelect);
