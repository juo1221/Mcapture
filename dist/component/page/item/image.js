import { BaseComponent } from "./../../component.js";
export class ImageComopnent extends BaseComponent {
    constructor(src, title = "이미지를 불러오지 못했습니다.") {
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
        this.img_L = 0;
        this.moveDragLeftRight = (event) => {
            const dmvx = parseInt(event.clientX + this.img_L);
            this.targetElemLeftRight.style.left = dmvx + "px";
        };
        this.startDragLeftRight = (event, img) => {
            this.targetElemLeftRight = img;
            this.img_L = this.getLeft(img) - event.clientX;
            document.onmousemove = this.moveDragLeftRight;
            document.onmouseup = this.stopDrag;
            if (event.preventDefault)
                event.preventDefault();
        };
        this.ImageElement = this.element.querySelector(".image__thumbnail");
        this.ImageElement.src = src;
        this.ImageElement.alt = title;
        this.targetElemLeftRight = this.element.querySelector(".dragging__leftRight");
        this.targetElemLeftRight.addEventListener("mousedown", (e) => {
            const target = e.currentTarget;
            if (target.className !== "dragging__leftRight")
                return;
            this.startDragLeftRight(e, this.targetElemLeftRight);
        });
    }
    getLeft(img) {
        return parseInt(img.style.left.replace("px", ""));
    }
    stopDrag() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
//# sourceMappingURL=image.js.map