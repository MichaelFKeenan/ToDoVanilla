import template from './template.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FilterButton extends HTMLElement {
  FilterListFunc;
  ButtonEl;

  constructor(filter, filterListFunc) {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(templateEl.content.cloneNode(true));

    this.ButtonEl = shadow.getElementById('root');

    this.FilterListFunc = filterListFunc;

    this.ButtonEl.id = filter.htmlIdentifier;
    this.ButtonEl.innerHTML = this.buildFilterText(filter);

    this.ButtonEl.addEventListener('click', () => this.filterClick(filter));

    console.log(this);
  }

  filterClick = (filter) => {
    filter.active = !filter.active;
    this.ButtonEl.innerHTML = this.buildFilterText(filter);
    this.FilterListFunc();
  }

  buildFilterText = (filter) => filter.name + (filter.active ? ' on' : ' off');
}
window.customElements.define('filter-button', FilterButton);
