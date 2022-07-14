import { Controller } from "@hotwired/stimulus";
//import * as Turbo from "@hotwired/turbo";
import { FigureTemplate } from "../templates/figure.html";
import { isSingle } from "../utils/base";

const bce: [number, number][] = [];
const singles: [number, number][] = [];
const steps: [number, number, number][] = [];
const dividers: number[] = [];

export default class extends Controller {
  static targets = ["nums", "output", "steps"];

  declare readonly numsTargets: HTMLInputElement[];
  declare readonly stepsTarget: Element;

  /**
   *
   * Testjpf
   * 9007199254740991 max integer.
   * may be able to cobble together stings from stepG
   *  for greater than
   * 3001427978 * 300096999
   *
   * TODO
   * Make buttons unique per level
   * concatenate large numbers over js limit for result
   * put requirements on tep bc & e to limit big numbers
   * polish and content
   */

  Figure(level: string) {
    console.log("FIGURE");
    const stepB = bce[0] ? bce[0] : singles[0];
    const stepC = bce[1] ? bce[1] : singles[1];
    const stepE = bce[2] ? bce[2] : singles[2];
    const stepsR = steps.reverse();

    return FigureTemplate(level, bce, stepB, stepC, stepE, stepsR, dividers);
  }

  createFigure(level: string) {
    const bNums = bce[0];
    const cNums = bce[1];
    const eNums = bce[2];
    const newRow: HTMLElement = document.createElement("div");
    const rows: NodeListOf<Element> = document.querySelectorAll(".steps__row");
    const levelNumber: number = parseInt(level.slice(-1));

    if (rows.length > levelNumber)
      for (let i = rows.length - 1; i > levelNumber - 1; i--)
        rows[i].parentNode.removeChild(rows[i]);

    newRow.classList.add(`steps__row`, `steps__row${level}`);
    const figure: string = this.Figure(level);
    newRow.innerHTML = figure;
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
  }

  calculate(
    e: MouseEvent,
    nums: number[] | null,
    level: number | null,
    button: HTMLElement | null
  ) {
    e.preventDefault;
    bce.length = 0;
    steps.length = 0;
    singles.length = 0;
    dividers.length = 0;
    console.log(`1: ${nums}`);
    this.karatsuba(nums ? nums : this.nums);
    console.log(`2: level ${level}`);
    this.createFigure(level ? "l" + level : "l0");
    console.log("3");

    if (button) {
      const row = document.getElementsByClassName(`steps__rowl${level - 1}`);
      const actives = row[0].querySelectorAll(".active");
      console.log(row);
      console.log(actives);
      actives.forEach((a) => {
        a.classList.remove("active");
      });
      button.classList.add("active");
      button.parentElement.classList.add("active");
    }
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
