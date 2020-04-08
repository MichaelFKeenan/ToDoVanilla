import template from './template.html';
import PubSub from '../../../../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FilterButton extends HTMLElement {
  ButtonEl;

  constructor(filter) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.ButtonEl = shadow.getElementById('root');

    this.ButtonEl.id = filter.htmlIdentifier;
    this.ButtonEl.innerHTML = this.buildFilterText(filter);

    this.ButtonEl.addEventListener('click', () => {
      this.filterClick(filter)
      PubSub.publish("filterListEvent")
    })
  }

  filterClick = (filter) => {
    filter.active = !filter.active;
    this.ButtonEl.innerHTML = this.buildFilterText(filter);
  }

  buildFilterText = (filter) => filter.name + (filter.active ? ' on' : ' off');
}
window.customElements.define('filter-button', FilterButton);
