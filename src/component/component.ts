export interface Component {
  attatchTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;
  constructor(HtmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = HtmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attatchTo(parent: HTMLElement, position: InsertPosition = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
  removeFrom(parent: HTMLElement) {
    parent.removeChild(this.element);
  }
}
