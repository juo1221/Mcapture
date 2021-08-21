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

      dialog.setOnSubmit((src: string[], progressBar: HTMLProgressElement) => {
        let runtime: number = 0;
        if (!src.length) throw new Error("이미지를 첨부하세요");
        for (let imgUrl of src) {
          runtime++;
          const image = new ImageComopnent(imgUrl);
          this.page.addChild(image);
          progressBar.value = (runtime / src.length) * 100;
        }
      });
    });
    const printBtn = document.querySelector(".print")! as HTMLButtonElement;
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}
new App(document.querySelector(".page")! as HTMLElement);
