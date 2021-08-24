import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private targetElemTopBottom: HTMLElement;
  private img_T: number = 0;

  constructor() {
    super(`
        <div class="page-break-after">
          <li class="page-item dragging__topDown" style="top:0px;">
              <div class="container" >
                    <div class="page-item__body"></div>
                    <button class="removeBtn no-print">&times;</button>
                    <button class="moveBtn no-print"><i class="fas fa-exchange-alt"></i></button>
              </div>
          </li>
        </div>
        `);

    // 이미지 상하 드래깅
    this.targetElemTopBottom = this.element.querySelector(
      ".dragging__topDown"
    )! as HTMLElement;

    this.targetElemTopBottom.addEventListener("mousedown", (e: any) => {
      if (e.target.className.includes("page-item")) {
        this.startDragTopDown(e, this.targetElemTopBottom);
      }
    });

    // 삭제버튼
    const removeBtn = this.element.querySelector(
      ".removeBtn"
    )! as HTMLButtonElement;
    removeBtn.addEventListener("click", () => {
      this.element.remove();
    });

    // z-index 감소 버튼 (moveBtn)
    const moveBtn = this.element.querySelector(
      ".moveBtn"
    )! as HTMLButtonElement;
    moveBtn.addEventListener("click", () => {
      this.targetElemTopBottom.style.zIndex = "300";
    });
  }

  // 이미지를 상하로
  private moveDragTopDown = (event: any) => {
    const dmvy = parseInt(event.clientY + this.img_T);
    this.targetElemTopBottom.style.top = dmvy + "px";
  };

  // 상하 드래그
  private startDragTopDown = (event: any, img: HTMLElement) => {
    this.targetElemTopBottom = img;
    this.img_T = this.getTop(img) - event.clientY;

    document.onmousemove = this.moveDragTopDown;
    document.onmouseup = this.stopDrag;
    if (event.preventDefault) event.preventDefault();
  };

  private getTop(img: HTMLElement) {
    return parseInt(img.style.top.replace("px", ""));
  }

  private stopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
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
