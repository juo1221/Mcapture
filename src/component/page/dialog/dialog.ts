import { BaseComponent } from "../../component.js";

export class Dialog extends BaseComponent<HTMLFormElement> {
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
  }
}
