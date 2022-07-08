import { Controller } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";

const halves: [number,number][] = [];
let steps: number[] = [];


export default class extends Controller {
  static targets = [ "name", "output", "steps" ];

  declare readonly nameTarget: HTMLInputElement;
  declare readonly hasOutputTarget: boolean;
  declare readonly outputTarget: Element;
  declare readonly outputTargets: Element[];
  declare readonly stepsTarget: Element;
  /**
  steps() {

    this.stepsTarget.append(`<div>stepE: ${stepE}</div>`);
  }
 */
  greet() {
  //console.log(this.karatsuba(2531, 11467))
  //console.log(this.karatsuba(2531, 1467))
  console.log(this.karatsuba(25, 63))
  console.dir(halves)
  console.dir(steps)
  this.outputTarget.textContent = `Hello, ${this.name}!`;
  }

  splitter = (whole:string, divider:number) => {
    const half1: number = parseInt(whole.substring(0, divider));
    const half2: number = parseInt(whole.substring(divider));
    let arr: [number, number] = [half1,half2]; 

    //console.log(`half1: ${half1} half2: ${half2}`);
    if (half1 > 9 && half2 > 9) halves.push(arr);
    return arr
};

 karatsuba(num1, num2) {
    if (num1 < 10 || num2 < 10) {
      /**
       * testjpf
       * use singles to show nested low level steps
       */
      console.log(`single: ${num1} | ${num2}`);
        return num1 * num2 
    }
    console.log(`SPLIT: ${num1} | ${num2}`);
    
    const short = Math.min(num1.toString().length, num2.toString().length)
    const  mid = Math.floor(short / 2) 
    const [n1h1, n1h2]: [n1h1:number,n1h2: number] = this.splitter(num1.toString(), num1.toString().length-mid)
    const [n2h1, n2h2] = this.splitter(num2.toString(), num2.toString().length-mid)
    //TESTJPF feel mlike I'll have to dynamically come up with step vars
    //Steps may vary on greater input values
    const stepB = this.karatsuba(n1h1, n2h1)
    const stepC = this.karatsuba(n1h2, n2h2)
    const stepE = this.karatsuba(n1h2 + n1h1, n2h2 + n2h1)
    //TESTJPF need sme conditional for the values you want to actually store. 
    // multi digit calculations probably
    console.log(`stepB: ${stepB} | stepC: ${stepC} |  stepE: ${stepE}`);
    steps=[stepB,stepC,stepE]
    return (stepB *  10 ** (2 * mid )) + ((stepE - stepB - stepC) * 10 ** mid) + stepC
} 
  

  get name() {
    return this.nameTarget.value
  }
}