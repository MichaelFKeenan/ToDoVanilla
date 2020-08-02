import template from './template.html';
import PubSub from '../../../../pubsub.js'

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FilterButton extends HTMLElement {
  ButtonEl: HTMLElement;

  constructor(filter: IFilter) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.ButtonEl = shadow.getElementById('root');

    this.ButtonEl.id = filter.HtmlIdentifier;
    this.ButtonEl.innerHTML = filter.Name;
    this.updateClassList(filter.Active);

    this.ButtonEl.addEventListener('click', () => {
      this.filterClick(filter)
      PubSub.publish("filterListEvent")
    })
  }

  filterClick = (filter: IFilter) => {
    filter.Active = !filter.Active;
    this.updateClassList(filter.Active);
  }

  updateClassList = (isActive: boolean) => {
    this.ButtonEl.classList.remove(isActive ? 'btn-secondary' : 'btn-primary');
    this.ButtonEl.classList.add(isActive ? 'btn-primary' : 'btn-secondary');
  }
}
window.customElements.define('filter-button', FilterButton);
