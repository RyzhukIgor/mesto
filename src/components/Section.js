export default class Section {
    constructor({renderer }, selectorContainer) {
        this._renderer = renderer;
        this._container = document.querySelector(selectorContainer);
    }

    rendererItems(renderedItems) {
        renderedItems.forEach(this._renderer);
    }

    addItem(element) {
        this._container.append(element);
    }
}
