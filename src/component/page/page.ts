import { BaseComponent } from "../component.js";

export class PageComopnent extends BaseComponent<HTMLUListElement> {
  constructor() {
    super(`
    <ul class="page-items"></ul>`);
  }
}
