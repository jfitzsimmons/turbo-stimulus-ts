import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";

export default class extends Controller {
  static targets = ["output"];
  declare readonly outputTarget: Element;

  connect() {
    this.outputTarget.textContent = "Run in foo_controllerasdf";
  }

  jump() {
    Turbo.visit("/index.html");
  }
}
