import { PageComopnent } from "./component/page/page.js";
import { Dialog } from "./component/page/dialog/dialog.js";
import { ImageComopnent } from "./component/page/item/image.js";
class App {
    constructor(appRoot) {
        this.saveSelectedPage = [];
        this.page = new PageComopnent();
        this.page.attatchTo(appRoot);
        const startBtn = document.querySelector(".start");
        startBtn.addEventListener("click", () => {
            const dialog = new Dialog();
            dialog.attatchTo(appRoot, "beforebegin");
            dialog.setOnSubmit((src, progressBar) => {
                let runtime = 0;
                if (!src.length)
                    throw new Error("이미지를 첨부하세요");
                for (let imgUrl of src) {
                    runtime++;
                    const image = new ImageComopnent(imgUrl);
                    this.page.addChild(image);
                    progressBar.value = (runtime / src.length) * 100;
                }
            });
        });
        const imagePerpage = document.querySelector(".imagePerpage");
        imagePerpage.addEventListener("change", (e) => {
            const target = e.target;
            if (isNaN(Number(target.value))) {
                alert("숫자만 입력해주세요");
                target.value = "";
                target.focus();
                return;
            }
            else if (Number(target.value) > 6) {
                alert("6을 초과할 수 없습니다.");
                target.value = "";
                target.focus();
                return;
            }
            this.saveSelectedPage.forEach((selected) => {
                selected.classList.remove("page-break-after__selected");
            });
            const selectedPage = [
                ...document.querySelectorAll(`.page-break-after:nth-of-type(${target.value}n)`),
            ];
            this.saveSelectedPage = [...selectedPage];
            selectedPage.forEach((selected) => {
                selected.classList.add("page-break-after__selected");
            });
        });
        const printBtn = document.querySelector(".print");
        printBtn.addEventListener("click", () => {
            if (!imagePerpage.value) {
                alert("페이지당 최대 이미지 수를 설정하세요");
                return;
            }
            window.print();
        });
    }
}
new App(document.querySelector(".page"));
//# sourceMappingURL=app.js.map