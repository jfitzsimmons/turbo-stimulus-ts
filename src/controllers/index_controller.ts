import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";

export default class extends Controller {
  static targets = ["output"];
  declare readonly outputTarget: Element;
  declare readonly outputTargets: Element[];
  declare readonly hasOutputTarget: boolean;

  jump() {
    Turbo.visit("/karatsuba.html", { action: "replace" });
  }
}
