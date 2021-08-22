export class BaseComponent {
    constructor(HtmlString) {
        const template = document.createElement("template");
        template.innerHTML = HtmlString;
        this.element = template.content.firstElementChild;
    }
    attatchTo(parent, position = "beforeend") {
        parent.insertAdjacentElement(position, this.element);
    }
    removeFrom(parent) {
        parent.removeChild(this.element);
    }
}
//# sourceMappingURL=component.js.map