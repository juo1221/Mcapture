import { PageComopnent } from "./component/page/page.js";
import { Dialog } from "./component/page/dialog/dialog.js";
import { ImageComopnent } from "./component/page/item/image.js";
class App {
  private page: PageComopnent;
  private saveSelectedPage: Element[] = [];

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
    const imagePerpage = document.querySelector(
      ".imagePerpage"
    )! as HTMLButtonElement;

    imagePerpage.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;

      if (isNaN(Number(target.value))) {
        alert("숫자만 입력해주세요");
        target.value = "";
        target.focus();
        return;
      } else if (Number(target.value) > 6) {
        alert("6을 초과할 수 없습니다.");
        target.value = "";
        target.focus();
        return;
      }

      // 이전 정보 삭제
      this.saveSelectedPage.forEach((selected: Element) => {
        selected.classList.remove("page-break-after__selected");
      });

      const selectedPage: Element[] = [
        ...document.querySelectorAll(
          `.page-break-after:nth-of-type(${target.value}n)`
        ),
      ];

      // 정보저장
      this.saveSelectedPage = [...selectedPage];

      selectedPage.forEach((selected: Element) => {
        selected.classList.add("page-break-after__selected");
      });
    });

    const printBtn = document.querySelector(".print")! as HTMLButtonElement;
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}
new App(document.querySelector(".page")! as HTMLElement);
