import { BaseComponent } from "../component.js";
export class PageItemComponent extends BaseComponent {
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
        this.img_T = 0;
        this.moveDragTopDown = (event) => {
            const dmvy = parseInt(event.clientY + this.img_T);
            this.targetElemTopBottom.style.top = dmvy + "px";
        };
        this.startDragTopDown = (event, img) => {
            this.targetElemTopBottom = img;
            this.img_T = this.getTop(img) - event.clientY;
            document.onmousemove = this.moveDragTopDown;
            document.onmouseup = this.stopDrag;
            if (event.preventDefault)
                event.preventDefault();
        };
        this.targetElemTopBottom = this.element.querySelector(".dragging__topDown");
        this.targetElemTopBottom.addEventListener("mousedown", (e) => {
            if (e.target.className.includes("page-item")) {
                this.startDragTopDown(e, this.targetElemTopBottom);
            }
        });
        const removeBtn = this.element.querySelector(".removeBtn");
        removeBtn.addEventListener("click", () => {
            this.element.remove();
        });
        const moveBtn = this.element.querySelector(".moveBtn");
        moveBtn.addEventListener("click", () => {
            this.targetElemTopBottom.style.zIndex = "300";
        });
    }
    getTop(img) {
        return parseInt(img.style.top.replace("px", ""));
    }
    stopDrag() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
    addChild(child) {
        const body = this.element.querySelector(".page-item__body");
        child.attatchTo(body);
    }
}
export class PageComopnent extends BaseComponent {
    constructor() {
        super(`
    <ul class="page-items"></ul>`);
    }
    addChild(child) {
        const item = new PageItemComponent();
        item.addChild(child);
        item.attatchTo(this.element);
    }
}
//# sourceMappingURL=page.js.map