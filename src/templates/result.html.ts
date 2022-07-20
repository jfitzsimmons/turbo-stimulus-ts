import { trailingZeros } from "../utils/base";

const max = 3602879702092599;

export const ResultTemplate = (
  stepsR: [number, number, number][],
  dividers: number[],
  result: number
) => {
  let resultPrint = result.toString();
  console.log(`resultPrint: ${resultPrint}`);

  if (result > max) {
    const resultPrint1st16 = resultPrint.substring(0, 14);
    const diff = resultPrint.length - 14; //max.length-1;
    const stepB = stepsR[0][0].toString() + trailingZeros(dividers[0] * 2);
    const stepC = stepsR[0][1].toString();
    const stepF =
      (stepsR[0][2] - stepsR[0][1] - stepsR[0][0]).toString() +
      trailingZeros(dividers[0]);
    const remainder1 = stepC.substring(stepC.length - diff, stepC.length);
    const remainder2 = stepF.substring(stepF.length - diff, stepF.length);
    const remainder3 = stepB.substring(stepB.length - diff, stepB.length);

    console.log(`resultPrint1st16: ${resultPrint1st16} | diff:  ${diff}`);
    console.log(`stepC: ${stepC} | stepF: ${stepF}`);
    console.log(`remainder1: ${remainder1} | remainder2: ${remainder2}`);
    console.log(`stepr.2: ${stepsR[0][2] - stepsR[0][1] - stepsR[0][0]}`);

    const numberCarrier = (
      parseInt(remainder1) +
      parseInt(remainder2) +
      parseInt(remainder3)
    ).toString();

    console.log(`numberCarrier: ${numberCarrier}`);

    resultPrint =
      resultPrint1st16 +
      numberCarrier.substring(
        numberCarrier.length - diff,
        numberCarrier.length
      );
  }

  return /*html*/ `
    <div id="stepG" class="step stepG blue">
      <div class="step__label">G</div>
      ${stepsR[0][0]}<span class="zeros">${trailingZeros(dividers[0] * 2)}</span
      ><br />
      + ${stepsR[0][2] - stepsR[0][1] - stepsR[0][0]}<span class="zeros"
        >${trailingZeros(dividers[0])}</span
      ><br />
      + ${stepsR[0][1]}
      <hr />
      <span id="result">${resultPrint}</span>
      <br />
    </div>
  `;
};
