import { BaseComponent } from "./../../component.js";

export class ImageComopnent extends BaseComponent<HTMLImageElement> {
  private ImageElement: HTMLImageElement;

  constructor(src: string, title: string = "이미지를 불러오지 못했습니다.") {
    super(`
    <section class="image" >
        <div class="image__holder">
              <img class="image__thumbnail"/>
        </div>
    </section>
`);

    // 이미지 받아오기
    this.ImageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;

    this.ImageElement.src = src;
    this.ImageElement.alt = title;
  }
}
