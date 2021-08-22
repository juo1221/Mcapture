import { BaseComponent } from "../../component.js";
export class Dialog extends BaseComponent {
    constructor() {
        super(`
      <form class="dialog no-print">
        <div class="dialog-container">
          <h1>upload your file</h1>
          <div class="dialog-uploader">
            <div class="upload-file__buttons">
              <label for="img_file" class="upload-file__add">파일추가</label>
              <button type="button" class="upload-file__delete">파일삭제</button>
            </div>
            <ul class="upload-file__lists"></ul>
            <span class="upload-file__count">총 파일 : 0개</span>
          </div>
          <input
            type="file"
            accept="image/*"
            id="img_file"
            multiple
            class="upload-hidden"
          />
          
          <div width="100%">
            <progress class="progress-bar" max="100" value="0"></progress>
          </div>
          <div class="dialog-buttons">
            <button type="button" class="dialog-close">cancel</button>
            <button type="submit" class="dialog-run">run</button>
          </div>
        </div>
    </form>  
      `);
        this.imgUrl = [];
        const cancelBtn = this.element.querySelector(".dialog-close");
        cancelBtn.addEventListener("click", () => {
            this.element.remove();
        });
        const imgFileAddBtn = this.element.querySelector("#img_file");
        const imgFileDeleteBtn = this.element.querySelector(".upload-file__delete");
        const imgCount = this.element.querySelector(".upload-file__count");
        const imgList = this.element.querySelector(".upload-file__lists");
        const progressBar = this.element.querySelector(".progress-bar");
        imgFileAddBtn.onchange = (e) => {
            const files = [...e.target.files];
            const readers = [];
            if (!files.length)
                return;
            for (let i = 0; i < files.length; i++) {
                readers.push(this.readAsDataURL(files[i]));
            }
            Promise.all(readers)
                .then((dataUrls) => {
                let newDataUrl = [...dataUrls];
                this.imgUrl = newDataUrl;
            })
                .then(() => {
                imgList.innerHTML = `${files
                    .map((file, id) => `<li class="upload-file__list">
                    <label for="fileCheck${id}">${file.name}</label>
                    <input type="checkbox" id="fileCheck${id}" class="checkbox"/>
                </li>`)
                    .join("")}`;
                imgCount.textContent = `총 파일 : ${imgList.childElementCount} 개`;
            });
        };
        imgFileDeleteBtn.addEventListener("click", () => {
            if (!imgList.childElementCount)
                return;
            const checkedItems = [...imgList.querySelectorAll(".checkbox")].filter((item) => item.checked);
            const targetIds = checkedItems.map((item) => { var _a; return (_a = item.getAttribute("id")) === null || _a === void 0 ? void 0 : _a.replace(/[^0-9]/g, ""); });
            const checkedTargetlists = checkedItems.map((checked) => checked.parentElement);
            checkedTargetlists.forEach((target) => target === null || target === void 0 ? void 0 : target.remove());
            targetIds
                .sort((a, b) => Number(b) - Number(a))
                .forEach((id) => this.imgUrl.splice(Number(id), 1));
            imgCount.textContent = `총 파일 : ${imgList.childElementCount} 개`;
        });
        const dialog = this.element;
        dialog.addEventListener("submit", (e) => {
            e.preventDefault();
            this.onSubmit && this.onSubmit(this.imgUrl, progressBar);
            setTimeout(() => {
                this.element.remove();
            }, 500);
        });
    }
    setOnSubmit(listener) {
        this.onSubmit = listener;
    }
    readAsDataURL(file) {
        return new Promise(function (resolve, reject) {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                resolve(fileReader.result);
            };
            fileReader.onerror = function () {
                reject(fileReader);
            };
            fileReader.readAsDataURL(file);
        });
    }
}
//# sourceMappingURL=dialog.js.map