import { PageComopnent } from "./component/page/page.js";

class App {
  private page: PageComopnent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComopnent();
    this.page.attatchTo(appRoot);

    const startBtn = document.querySelector(".start")! as HTMLButtonElement;
    startBtn.addEventListener("click", () => {});
  }
}
new App(document.querySelector(".page")! as HTMLElement);
