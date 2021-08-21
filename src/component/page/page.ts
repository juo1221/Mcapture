import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(`
        <div class="page-break-after">
          <li class="page-item ">
              <div class="container dragging__topDown" style="top:0px;">
                    <div class="page-item__body"></div>
                    <button class="removeBtn no-print">&times;</button>
                    <button class="moveBtn no-print"><i class="fas fa-exchange-alt"></i></button>
              </div>
          </li>
        </div>
        `);

    // 삭제버튼
    const removeBtn = this.element.querySelector(
      ".removeBtn"
    )! as HTMLButtonElement;
    removeBtn.addEventListener("click", () => {
      this.element.remove();
    });
  }
  addChild(child: Component) {
    const body = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attatchTo(body);
  }
}

export class PageComopnent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`
    <ul class="page-items"></ul>`);
  }
  addChild(child: Component) {
    const item = new PageItemComponent();
    item.addChild(child);
    item.attatchTo(this.element);
  }
}
