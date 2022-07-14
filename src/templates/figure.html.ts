import { BceTemplate } from "./bce.html";
import { ResultTemplate } from "./result.html";

//const max = 36028797020925944;

/**testjpf
 * if i remove digit from max
 * ex: 3602879702092599
 * take last digit and mak 0? concatenate after?
 *  by number of digits greater than max.length
 * ex: 3602879702092599.length = 16
 * */
const trailingZeros = (n: number) => {
  let zeros = "";
  for (let i = n; i--; ) {
    zeros += "0";
  }
  return zeros;
};

/**
 * onclick events and "red" class if step passes single check!!!
 * TESTJPF
 * need a bce.html.js component
 * 2 templates? on clickable on not?
 * may require more granular abstraction in the template.
 * instead of adding red class, conditional a button element!!!
 * 6002850578 * 6001948
 */
export const FigureTemplate = (
  level: string,
  bce: [number, number][],
  stepB: [number, number],
  stepC: [number, number],
  stepE: [number, number],
  stepsR: [number, number, number][],
  dividers: number[]
) => {
  //testjpf cleanup delete
  console.log(stepsR);
  console.log(
    stepsR[0][0] * 10 ** (dividers[0] * 2) +
      (stepsR[0][2] - stepsR[0][1] - stepsR[0][0]) * 10 ** dividers[0] +
      stepsR[0][1]
  );
  console.log(
    `1:${stepsR[0][0] * 10 ** (dividers[0] * 2)} | 2:${
      (stepsR[0][2] - stepsR[0][1] - stepsR[0][0]) * 10 ** dividers[0]
    } | 3:${stepsR[0][1]}`
  );
  return (
    /*html*/ `
    
  <div id="stepA" class="step stepA karat">
    <div class="step__label">A</div>
    <div class="stepA__grid">
      <div>${bce[0][0]}</div>
      <div>${bce[1][0]}</div>
      <div>${bce[0][1]}</div>
      <div>${bce[1][1]}</div>
    </div>
  </div>
  ` +
    BceTemplate(level, stepB, "B") +
    BceTemplate(level, stepC, "C") +
    /*html*/ `
  <div id="stepD" class="step stepD blue">
    <div class="step__label">D</div>
    ${stepB[0]} + ${stepC[0]} = ${stepE[0]}
    <br />
    ${stepB[1]} + ${stepC[1]} = ${stepE[1]}
  </div>
  ` +
    BceTemplate(level, stepE, "E") +
    /*html*/ `
  <div id="stepF" class="step stepF blue">
    <div class="step__label">F</div>
    ${stepsR[0][2]}<br />
    - ${stepsR[0][1]}<br />
    - ${stepsR[0][0]}
    <hr />
    ${stepsR[0][2] - stepsR[0][1] - stepsR[0][0]}
  </div>
  ` +
    ResultTemplate(stepsR, dividers) +
    "</div>"
  );
};
