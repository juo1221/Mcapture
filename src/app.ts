import { PageComopnent } from "./component/page/page.js";
import { Dialog } from "./component/page/dialog/dialog.js";
import { ImageComopnent } from "./component/page/item/image.js";

class App {
  private page: PageComopnent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComopnent();
    this.page.attatchTo(appRoot);

    const startBtn = document.querySelector(".start")! as HTMLButtonElement;
    startBtn.addEventListener("click", () => {
      const dialog = new Dialog();
      dialog.attatchTo(appRoot, "beforebegin");
    });
  }
}
new App(document.querySelector(".page")! as HTMLElement);
