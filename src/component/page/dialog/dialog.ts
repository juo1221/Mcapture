import { BaseComponent } from "../../component.js";

type OnSubmit = (imgUrl: string[], progress: HTMLProgressElement) => void;

export class Dialog extends BaseComponent<HTMLFormElement> {
  private onSubmit?: OnSubmit;
  private imgUrl: string[] = [];

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

    const cancelBtn = this.element.querySelector(
      ".dialog-close"
    )! as HTMLButtonElement;
    cancelBtn.addEventListener("click", () => {
      this.element.remove();
    });

    const imgFileAddBtn = this.element.querySelector(
      "#img_file"
    )! as HTMLInputElement;

    const imgFileDeleteBtn = this.element.querySelector(
      ".upload-file__delete"
    )! as HTMLButtonElement;

    const imgCount = this.element.querySelector(
      ".upload-file__count"
    )! as HTMLInputElement;

    const imgList = this.element.querySelector(
      ".upload-file__lists"
    )! as HTMLUListElement;

    const progressBar = this.element.querySelector(
      ".progress-bar"
    )! as HTMLProgressElement;

    // 파일 추가버튼 클릭 후 파일 추가 시
    imgFileAddBtn.onchange = (e: any) => {
      const files = [...e.target.files];
      const readers = [];

      if (!files.length) return;

      for (let i = 0; i < files.length; i++) {
        readers.push(this.readAsDataURL(files[i]));
      }

      Promise.all(readers)
        .then((dataUrls) => {
          let newDataUrl = [...dataUrls] as string[];

          // 이미지url 저장
          this.imgUrl = newDataUrl;
        })
        .then(() => {
          imgList.innerHTML = `${files
            .map(
              (file: any, id: number) =>
                `<li class="upload-file__list">
                    <label for="fileCheck${id}">${file.name}</label>
                    <input type="checkbox" id="fileCheck${id}" class="checkbox"/>
                </li>`
            )
            .join("")}`;
          imgCount.textContent = `총 파일 : ${imgList.childElementCount} 개`;
        });
    };

    // 파일 체크 후 삭제버튼 클릭 시
    imgFileDeleteBtn.addEventListener("click", () => {
      if (!imgList.childElementCount) return;

      const checkedItems = [...imgList.querySelectorAll(".checkbox")].filter(
        (item) => (item as HTMLInputElement).checked
      )! as HTMLInputElement[];

      // 체크한 파일의 id들만 받아오기
      const targetIds = checkedItems.map((item) =>
        item.getAttribute("id")?.replace(/[^0-9]/g, "")
      );

      // 체크한 파일 지우기
      const checkedTargetlists = checkedItems.map(
        (checked) => checked.parentElement
      );

      checkedTargetlists.forEach((target) => target?.remove());

      // 체크된 item의 아이디를 내림차순 정렬 후, 해당 url을 삭제
      targetIds
        .sort((a, b) => Number(b) - Number(a)) // 뒤에있는거 부터 지우기 위해
        .forEach((id) => this.imgUrl.splice(Number(id), 1));

      imgCount.textContent = `총 파일 : ${imgList.childElementCount} 개`;
    });

    // run 클릭 시
    const dialog = this.element! as HTMLFormElement;
    dialog.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.onSubmit && this.onSubmit(this.imgUrl, progressBar);
      setTimeout(() => {
        this.element.remove();
      }, 500);
    });
  }

  setOnSubmit(listener: OnSubmit) {
    this.onSubmit = listener;
  }

  readAsDataURL(file: any) {
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
