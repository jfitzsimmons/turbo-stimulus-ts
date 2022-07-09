import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";
import { FigureTemplate } from "../templates/figure.html";
import { isSingle } from "../utils/base";

const bce: [number, number][] = [];
const singles: [number, number][] = [];
const steps: [number, number, number][] = [];
const dividers: number[] = [];

export default class extends Controller {
  static targets = ["name", "output", "steps"];

  declare readonly nameTarget: HTMLInputElement;
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

  greet() {
    //console.log(this.karatsuba(2531, 11467));
    //console.log(this.karatsuba(2531, 1467));
    console.log(this.karatsuba(25, 63));
    //console.log(this.karatsuba(25, 14))
    console.dir(bce);
    console.dir(steps);
    console.dir(singles);
    console.dir(dividers);
    const figure: string = this.Figure();
    this.stepsTarget.innerHTML = figure;
  }

  splitter = (whole: string, divider: number) => {
    const half1: number = parseInt(whole.substring(0, divider));
    const half2: number = parseInt(whole.substring(divider));
    const arr: [number, number] = [half1, half2];

    dividers.push(divider);

    return arr;
  };

  karatsuba(num1, num2) {
    if (isSingle(num1, num2)) {
      singles.push([num1, num2]);
      return num1 * num2;
    }
    console.log(`SPLIT: ${num1} | ${num2}`);

    const short = Math.min(num1.toString().length, num2.toString().length);
    const mid = Math.floor(short / 2);
    const [n1h1, n1h2]: [n1h1: number, n1h2: number] = this.splitter(
      num1.toString(),
      num1.toString().length - mid
    );

    const [n2h1, n2h2] = this.splitter(
      num2.toString(),
      num2.toString().length - mid
    );
    bce.push([n1h1, n2h1], [n1h2, n2h2], [n1h2 + n1h1, n2h2 + n2h1]);
    const stepB = this.karatsuba(n1h1, n2h1);
    const stepC = this.karatsuba(n1h2, n2h2);
    const stepE = this.karatsuba(n1h2 + n1h1, n2h2 + n2h1);

    console.log(`stepB: ${stepB} | stepC: ${stepC} |  stepE: ${stepE}`);
    steps.push([stepB, stepC, stepE]);
    return (
      stepB * 10 ** (2 * mid) + (stepE - stepB - stepC) * 10 ** mid + stepC
    );
  }

  get name() {
    return this.nameTarget.value;
  }
}
