export const FigureTemplate = (abce, stepB, stepC, stepE, stepsR, dividers) => `
      <div id="stepA" class="stepA">
        ${abce[1][0]} | ${abce[2][0]}
        <br /> 
        ${abce[1][1]} | ${abce[2][1]}
      </div>
      <div id="stepB" class="stepB">
        ${stepB[0]} x ${stepB[1]} = ${stepB[0] * stepB[1]}
      </div>
      <div id="stepC" class="stepC">
        ${stepC[0]} x ${stepC[1]} = ${stepC[0] * stepC[1]}
      </div>
      <div id="stepD" class="stepD">
        ${stepB[0]} + ${stepC[0]} = ${stepE[0]} 
        <br />
        ${stepB[1]} + ${stepC[1]} = ${stepE[1]} 
      </div>
      <div id="stepE" class="stepE">
        ${abce[0][0]} x ${abce[0][1]} = ${stepsR[0][2]}
      </div>
      <div id="stepF" class="stepF">
        ${stepsR[0][2]} - ${stepsR[0][1]} - ${stepsR[0][0]} = 
        ${stepsR[0][2] - stepsR[0][1] - stepsR[0][0]} 
      </div>
      <div id="stepG" class="stepG">
        ${stepsR[0][0] * 10 ** (dividers[0] * 2)} + 
        ${(stepsR[0][2] - stepsR[0][1] - stepsR[0][0]) * 10 ** dividers[0]} + 
        ${stepsR[0][1]} = 
        ${
          stepsR[0][0] * 10 ** (dividers[0] * 2) +
          (stepsR[0][2] - stepsR[0][1] - stepsR[0][0]) * 10 ** dividers[0] +
          stepsR[0][1]
        }
      </div>
    `;
