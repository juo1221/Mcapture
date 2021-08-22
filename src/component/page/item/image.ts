// import { PageItemComponent } from "../page.js";
import { BaseComponent } from "./../../component.js";

export class ImageComopnent extends BaseComponent<HTMLImageElement> {
  private ImageElement: HTMLImageElement;
  private img_L: number = 0;
  private targetElemLeftRight: HTMLElement;

  constructor(src: string, title: string = "이미지를 불러오지 못했습니다.") {
    super(`
    <section class="image" >
        <div class="image__holder">
          <div id="resize">
            <div class="dragging__leftRight" style="left:0px;">
              <img class="image__thumbnail"/>
            </div>
          </div>
        </div>
    </section>
`);

    // 이미지 받아오기
    this.ImageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;

    this.ImageElement.src = src;
    this.ImageElement.alt = title;

    // 이미지 좌우 드래깅
    this.targetElemLeftRight = this.element.querySelector(
      ".dragging__leftRight"
    )! as HTMLElement;
    this.targetElemLeftRight.addEventListener("mousedown", (e) => {
      const target = e.currentTarget as HTMLElement;
      if (target.className !== "dragging__leftRight") return;
      this.startDragLeftRight(e, this.targetElemLeftRight);
    });
  }

  getLeft(img: HTMLElement) {
    return parseInt(img.style.left.replace("px", ""));
  }

  // 이미지를 좌우로
  moveDragLeftRight = (event: any maskable) => {
    const dmvx = parseInt(event.clientX + this.img_L);

    this.targetElemLeftRight.style.left = dmvx + "px";
  };

  // 좌우 드래그
  startDragLeftRight = (event: any maskable, img: HTMLElement) => {
    this.targetElemLeftRight = img;
    this.img_L = this.getLeft(img) - event.clientX;
    document.onmousemove = this.moveDragLeftRight;
    document.onmouseup = this.stopDrag;
    if (event.preventDefault) event.preventDefault();
  };

  // 드래그를 멈추기
  stopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
