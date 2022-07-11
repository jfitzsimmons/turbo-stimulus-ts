import { isSingle } from "../utils/base";
import { BceDivTemplate } from "./bce.html";
const trailingZeros = (n: number) => {
  let zeros = "";
  for (let i = n; i--; ) {
    zeros += "0";
  }
  return zeros;
};

const colorCheck = (red: boolean) => (red ? "red" : "gray");
/**
 * onclick events and "red" class if step passes single check!!!
 * TESTJPF
 * need a bce.html.js component
 * 2 templates? on clickable on not?
 * may require more granular abstraction in the template.
 * instead of adding red class, conditional a button element!!!
 */
export const FigureTemplate = (
  bce: [number, number][],
  stepB: [number, number],
  stepC: [number, number],
  stepE: [number, number],
  stepsR: [number, number, number][],
  dividers: number[]
) => {
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
    BceDivTemplate(stepB) +
    `
  <div
    id="stepC"
    class="step stepC karat ${colorCheck(isSingle(stepC[0], stepC[1]))}"
  >
    <div class="step__label">C</div>
    ${stepC[0]}<br />
    x ${stepC[1]}
    <hr />
    ${stepC[0] * stepC[1]}
  </div>
  <div id="stepD" class="step stepD blue">
    <div class="step__label">D</div>
    ${stepB[0]} + ${stepC[0]} = ${stepE[0]}
    <br />
    ${stepB[1]} + ${stepC[1]} = ${stepE[1]}
  </div>
  <div
    id="stepE"
    class="step stepE karat ${colorCheck(isSingle(stepE[0], stepE[1]))}"
  >
    <div class="step__label">E</div>
    ${stepE[0]}<br />
    x ${stepE[1]}
    <hr />
    ${stepsR[0][2]}
  </div>
  <div id="stepF" class="step stepF blue">
    <div class="step__label">F</div>
    ${stepsR[0][2]}<br />
    - ${stepsR[0][1]}<br />
    - ${stepsR[0][0]}
    <hr />
    ${stepsR[0][2] - stepsR[0][1] - stepsR[0][0]}
  </div>
  <div id="stepG" class="step stepG blue">
    <div class="step__label">G</div>
    ${stepsR[0][0]}<span class="zeros">${trailingZeros(dividers[0] * 2)}</span
    ><br />
    + ${stepsR[0][2] - stepsR[0][1] - stepsR[0][0]}<span class="zeros"
      >${trailingZeros(dividers[0])}</span
    ><br />
    + ${stepsR[0][1]}
    <hr />
    ${
      stepsR[0][0] * 10 ** (dividers[0] * 2) +
      (stepsR[0][2] - stepsR[0][1] - stepsR[0][0]) * 10 ** dividers[0] +
      stepsR[0][1]
    }
  </div>
`
  );
};
