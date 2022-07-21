import { Controller } from "@hotwired/stimulus";
//import * as Turbo from "@hotwired/turbo";
import { FigureTemplate } from "../templates/figure.html";
import { isSingle } from "../utils/base";

/** testjpf
 *
 * todos
 *
 * removve stimulus
\ * plus whatever else need onload
 * add testing back
 * more abstractin is needed / templates / css
 * commas for large nums
 */

const bce: [number, number][] = [];
const singles: [number, number][] = [];
const steps: [number, number, number][] = [];
const dividers: number[] = [];
const stepMax = 3602879702092599;
let standardSteps = 0;
export default class extends Controller {
  static targets = ["nums", "karatsuba", "steps"];

  declare readonly numsTargets: HTMLInputElement[];
  declare readonly stepsTarget: Element;
  declare readonly karatsubaTarget: Element;

  connect() {
    const btnB: HTMLElement = document.getElementById("l0BButton");
    btnB.addEventListener("click", (e) => this.calculate(e, [25, 14], 1, btnB));

    const btnC: HTMLElement = document.getElementById("l0CButton");
    btnC.addEventListener("click", (e) => this.calculate(e, [31, 67], 1, btnC));

    const btnE: HTMLElement = document.getElementById("l0EButton");
    btnE.addEventListener("click", (e) => this.calculate(e, [56, 81], 1, btnE));
  }
  static calculate: (
    e: MouseEvent,
    nums: number[] | null,
    level: number | null,
    button: HTMLElement | null
  ) => string;

  Figure(level: string) {
    const stepE = bce[2] ? bce[2] : singles[2];
    if (stepE[0] * stepE[1] > stepMax) return null;
    const stepB = bce[0] ? bce[0] : singles[0];
    const stepC = bce[1] ? bce[1] : singles[1];
    const stepsR = steps.reverse();

    return FigureTemplate(level, bce, stepB, stepC, stepE, stepsR, dividers);
  }

  createFigure(level: string, nums: number[]) {
    const bNums = bce[0];
    const cNums = bce[1];
    const eNums = bce[2];
    const newRow: HTMLElement = document.createElement("div");
    const rows: NodeListOf<Element> = document.querySelectorAll(".steps__row");
    const levelNumber: number = parseInt(level.slice(-1));
    const _nums = nums ? nums : this.nums;

    if (rows.length > levelNumber)
      for (let i = rows.length - 1; i > levelNumber - 1; i--)
        rows[i].parentNode.removeChild(rows[i]);

    const stepsSaved = /*html*/ `<div class="steps__savings"> <span class="red">Single digit multiplications</span> for ${_nums[0]} x ${_nums[1]}:<br/>Karatsuba: ${singles.length} | Standard: ${standardSteps}</div>`;
    newRow.innerHTML = stepsSaved;

    const figure: string | null = this.Figure(level);
    newRow.classList.add(`steps__row`, `steps__row${level}`);
    newRow.innerHTML += figure;

    if (figure) {
      this.stepsTarget.appendChild(newRow);
      if (!isSingle(bNums[0], bNums[1])) {
        const btn: HTMLElement = document.getElementById(level + "BButton");
        btn.addEventListener("click", (e) =>
          this.calculate(e, bNums, levelNumber + 1, btn)
        );
      }
      if (!isSingle(cNums[0], cNums[1])) {
        const btn: HTMLElement = document.getElementById(level + "CButton");
        btn.addEventListener("click", (e) =>
          this.calculate(e, cNums, levelNumber + 1, btn)
        );
      }
      if (!isSingle(eNums[0], eNums[1])) {
        const btn: HTMLElement = document.getElementById(level + "EButton");
        btn.addEventListener("click", (e) =>
          this.calculate(e, eNums, levelNumber + 1, btn)
        );
      }
    } else {
      this.stepsTarget.appendChild(newRow);
      newRow.innerHTML += `<div>ERROR: Result is too large</div>`;
    }
  }

  setActiveButtons(level: number | null, button: HTMLElement) {
    const row = document.getElementsByClassName(`steps__rowl${level - 1}`);
    const actives = row[0].querySelectorAll(".active");
    actives.forEach((a) => {
      a.classList.remove("active");
    });
    button.classList.add("active");
    button.parentElement.classList.add("active");
  }

  calculate(
    e: MouseEvent,
    nums: number[] | null,
    level: number | null,
    button: HTMLElement | null
  ) {
    e.preventDefault;
    (bce.length = 0),
      (steps.length = 0),
      (singles.length = 0),
      (dividers.length = 0);
    //testjpf move logic /abstract it
    if (!nums) {
      document.getElementById("rowExample").classList.add("inactive");
      document.getElementById("calculator").classList.add("active");
      document.getElementById("steps").classList.remove("inactive");
    }
    const _nums = nums ? nums : this.nums;

    standardSteps = _nums[0].toString().length * _nums[1].toString().length;
    this.karatsuba(_nums);
    // make return result so you can use for testing??
    this.createFigure(level ? "l" + level : "l0", nums);

    if (button) this.setActiveButtons(level, button);

    const result = document.getElementById("result");
    console.log(`innerhtml: ${result.textContent}`);

    console.log("bce");
    console.dir(bce);
    console.log("steps");
    console.dir(steps);
    console.log("singles");
    console.dir(singles);
    console.log("dividers");
    console.dir(dividers);
  }

  splitter = (whole: string, divider: number) => {
    const half1: number = parseInt(whole.substring(0, whole.length - divider));
    const half2: number = parseInt(whole.substring(whole.length - divider));
    const arr: [number, number] = [half1, half2];
    dividers.push(divider);

    return arr;
  };

  karatsuba(nums: number[]) {
    if (isSingle(nums[0], nums[1])) {
      //Testjpf still necessary?
      singles.push([nums[0], nums[1]]);
      return nums[0] * nums[1];
    }

    const short = Math.min(
      nums[0].toString().length,
      nums[1].toString().length
    );
    const mid = Math.floor(short / 2);
    const [n1h1, n1h2]: [n1h1: number, n1h2: number] = this.splitter(
      nums[0].toString(),
      mid
    );
    const [n2h1, n2h2] = this.splitter(nums[1].toString(), mid);

    bce.push([n1h1, n2h1], [n1h2, n2h2], [n1h2 + n1h1, n2h2 + n2h1]);

    const stepB: number = this.karatsuba([n1h1, n2h1]);
    const stepC: number = this.karatsuba([n1h2, n2h2]);
    const stepE: number = this.karatsuba([n1h2 + n1h1, n2h2 + n2h1]);

    steps.push([stepB, stepC, stepE]);

    return (
      stepB * 10 ** (2 * mid) + (stepE - stepB - stepC) * 10 ** mid + stepC
    );
  }

  get nums() {
    return [
      parseInt(this.numsTargets[0].value),
      parseInt(this.numsTargets[1].value),
    ];
  }
}
