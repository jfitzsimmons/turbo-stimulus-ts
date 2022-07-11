import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";
import { FigureTemplate } from "../templates/figure.html";
import { isSingle } from "../utils/base";

const bce: [number, number][] = [];
const singles: [number, number][] = [];
const steps: [number, number, number][] = [];
const dividers: number[] = [];

export default class extends Controller {
  static targets = ["num1", "nums", "output", "steps"];

  declare readonly numsTargets: HTMLInputElement[];
  declare readonly num1Target: HTMLInputElement;
  declare readonly hasOutputTarget: boolean;
  declare readonly outputTarget: Element;
  declare readonly outputTargets: Element[];
  declare readonly stepsTarget: Element;

  Figure() {
    const stepB = bce[0] ? bce[0] : singles[0];
    const stepC = bce[1] ? bce[1] : singles[1];
    const stepE = bce[2] ? bce[2] : singles[2];
    const stepsR = steps.reverse();

    return FigureTemplate(bce, stepB, stepC, stepE, stepsR, dividers);
  }

  calculateL0() {
    bce.length = 0;
    steps.length = 0;
    singles.length = 0;
    dividers.length = 0;
    // TESTJPF 252 X 63 DOES NOT WORK
    //Test with old commit and start branching
    //console.log(this.karatsuba(2531, 11467));
    this.karatsuba(this.nums);
    //console.log(this.karatsuba(25, 63));

    //console.log(this.karatsuba(2531, 1467));
    //console.log(this.karatsuba(252, 63));
    //console.log(this.karatsuba(25, 14))
    console.dir(bce);
    console.dir(steps);
    console.dir(singles);
    console.dir(dividers);
    //const numsInput = this.numsTargets;
    const figure: string = this.Figure();
    this.stepsTarget.innerHTML = figure;
    console.log(this.nums);

    // this.outputTarget.innerHTML = this.numsTargets.values;
  }

  splitter = (whole: string, divider: number) => {
    const half1: number = parseInt(whole.substring(0, whole.length - divider));
    console.log(`TESTJPF: ${whole} | ${whole.length} | ${divider}`);
    const half2: number = parseInt(whole.substring(whole.length - divider));
    const arr: [number, number] = [half1, half2];
    console.log(`divider in split: ${divider}`);
    dividers.push(divider);

    return arr;
  };

  karatsuba(nums: number[]) {
    if (isSingle(nums[0], nums[1])) {
      singles.push([nums[0], nums[1]]);
      return nums[0] * nums[1];
    }
    console.log(`SPLIT: ${nums[0]} | ${nums[1]}`);

    const short = Math.min(
      nums[0].toString().length,
      nums[1].toString().length
    );

    const mid = Math.floor(short / 2);
    const [n1h1, n1h2]: [n1h1: number, n1h2: number] = this.splitter(
      nums[0].toString(),
      mid
    );

    console.log(`short: ${short} | mid: ${mid} | `);

    const [n2h1, n2h2] = this.splitter(nums[1].toString(), mid);
    bce.push([n1h1, n2h1], [n1h2, n2h2], [n1h2 + n1h1, n2h2 + n2h1]);
    const stepB: number = this.karatsuba([n1h1, n2h1]);
    const stepC: number = this.karatsuba([n1h2, n2h2]);
    const stepE: number = this.karatsuba([n1h2 + n1h1, n2h2 + n2h1]);

    console.log(`stepB: ${stepB} | stepC: ${stepC} |  stepE: ${stepE}`);
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
