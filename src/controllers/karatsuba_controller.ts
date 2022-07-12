import { Controller } from "@hotwired/stimulus";
//import * as Turbo from "@hotwired/turbo";
import { FigureTemplate } from "../templates/figure.html";
import { isSingle } from "../utils/base";

const bce: [number, number][] = [];
const singles: [number, number][] = [];
const steps: [number, number, number][] = [];
const dividers: number[] = [];
let currentLevel = 0;

export default class extends Controller {
  static targets = ["nums", "output", "steps"];

  declare readonly numsTargets: HTMLInputElement[];
  declare readonly stepsTarget: Element;

  Figure(level: string) {
    console.log("FIGURE");
    const stepB = bce[0] ? bce[0] : singles[0];
    const stepC = bce[1] ? bce[1] : singles[1];
    const stepE = bce[2] ? bce[2] : singles[2];
    const stepsR = steps.reverse();
    //TESTJPF  HERES YOUR REPLACE ISSUE
    console.log(
      `${level}, ${bce}, ${stepB}, ${stepC}, ${stepE}, ${stepsR}, ${dividers}`
    );
    return FigureTemplate(level, bce, stepB, stepC, stepE, stepsR, dividers);
  }

  createFigure(level: string) {
    console.log(level);

    const newRow: HTMLElement = document.createElement("div");
    const rows: NodeListOf<Element> = document.querySelectorAll(
      ".steps__row" + level
    );
    //console.log(rows);
    if (rows.length > 0) {
      console.log(`remove currentlevel: ${currentLevel} | level: ${level}`);
      console.log(rows[currentLevel - 1]);
      rows[currentLevel - 1].parentNode.removeChild(rows[currentLevel - 1]);
      console.log(rows.length);
    } else {
      currentLevel = 1;
    }
    newRow.classList.add(`steps__row`, `steps__row${level}`);
    const figure: string = this.Figure(level);
    newRow.innerHTML = figure;
    this.stepsTarget.appendChild(newRow);

    if (!isSingle(bce[0][0], bce[0][1])) {
      const btn: HTMLElement = document.getElementById(level + "BButton");
      btn.addEventListener("click", (e) =>
        this.calculate(e, bce[0], "l" + currentLevel, btn)
      );
    }
    if (!isSingle(bce[1][0], bce[1][1])) {
      const btn: HTMLElement = document.getElementById(level + "CButton");
      btn.addEventListener("click", (e) =>
        this.calculate(e, bce[1], "l" + currentLevel, btn)
      );
    }
    if (!isSingle(bce[2][0], bce[2][1])) {
      const btn: HTMLElement = document.getElementById(level + "EButton");
      btn.addEventListener("click", (e) =>
        this.calculate(e, bce[2], "l" + currentLevel, btn)
      );
    }
  }

  calculate(
    e: MouseEvent,
    nums: number[] | null,
    level: string | null,
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
    /**
     * TESTJPF Issue is you need to remove the level if
     * it already exists and replace with a new one
     */
    console.dir(bce);
    this.createFigure(level ? level : "l0");
    console.log("3");
    if (button) button.classList.add("active");
  }

  splitter = (whole: string, divider: number) => {
    const half1: number = parseInt(whole.substring(0, whole.length - divider));
    //console.log(`TESTJPF: ${whole} | ${whole.length} | ${divider}`);
    const half2: number = parseInt(whole.substring(whole.length - divider));
    const arr: [number, number] = [half1, half2];
    //console.log(`divider in split: ${divider}`);
    dividers.push(divider);

    return arr;
  };

  karatsuba(nums: number[]) {
    if (isSingle(nums[0], nums[1])) {
      singles.push([nums[0], nums[1]]);
      return nums[0] * nums[1];
    }
    //console.log(`SPLIT: ${nums[0]} | ${nums[1]}`);

    const short = Math.min(
      nums[0].toString().length,
      nums[1].toString().length
    );

    const mid = Math.floor(short / 2);
    const [n1h1, n1h2]: [n1h1: number, n1h2: number] = this.splitter(
      nums[0].toString(),
      mid
    );

    //console.log(`short: ${short} | mid: ${mid} | `);

    const [n2h1, n2h2] = this.splitter(nums[1].toString(), mid);
    bce.push([n1h1, n2h1], [n1h2, n2h2], [n1h2 + n1h1, n2h2 + n2h1]);
    const stepB: number = this.karatsuba([n1h1, n2h1]);
    const stepC: number = this.karatsuba([n1h2, n2h2]);
    const stepE: number = this.karatsuba([n1h2 + n1h1, n2h2 + n2h1]);

    //console.log(`stepB: ${stepB} | stepC: ${stepC} |  stepE: ${stepE}`);
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
