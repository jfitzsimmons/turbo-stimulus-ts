//testjpf abstract trailing zeros
const trailingZeros = (n: number) => {
  let zeros = "";
  for (let i = n; i--; ) {
    zeros += "0";
  }
  return zeros;
};

/**testjpf
 * if i remove digit from max
 * ex: 3602879702092599
 * take last digit and mak 0? concatenate after?
 *  by number of digits greater than max.length
 * ex: 3602879702092599.length = 16
 * */

//const max = 18014398561754716;
const max = 3602879702092599;
//3001428301 * 6001948

export const ResultTemplate = (
  stepsR: [number, number, number][],
  dividers: number[]
) => {
  const result: number =
    stepsR[0][0] * 10 ** (dividers[0] * 2) +
    (stepsR[0][2] - stepsR[0][1] - stepsR[0][0]) * 10 ** dividers[0] +
    stepsR[0][1];
  let resultPrint = result.toString();
  if (result > max) {
    resultPrint = result.toString().substring(0, 15);
    const diff = result.toString().length - 15; //max.length-1;
    const concat = stepsR[0][1]
      .toString()
      .substring(
        stepsR[0][1].toString().length - diff,
        stepsR[0][1].toString().length
      );
    resultPrint += concat;
    console.log(`resultSTING: ${result.toString().substring(0, 15)}`);
    console.log(`resultPrint: ${resultPrint}`);
  }

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
      ${resultPrint}
      <br />
    </div>
  `;
};
