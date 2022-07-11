import { isSingle } from "../utils/base";

const colorCheck = (red: boolean) => (red ? "red" : "gray");
/**
 * onclick events and "red" class if step passes single check!!!
 * EXTERNAL FUNCTION for this
 * TESTJPF
 * need a bce.html.js component
 */
export const BceDivTemplate = (step: [number, number]) => /*html*/ `
  <div
    id="stepB"
    class="step stepB karat ${colorCheck(isSingle(step[0], step[1]))}"
  >
    <div class="step__label">B</div>
    ${step[0]}<br />
    x ${step[1]}
    <hr />
    ${step[0] * step[1]}
  </div>
`;
