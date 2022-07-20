import { isSingle } from "../utils/base";

const colorCheck = (red: boolean) => (red ? "red" : "gray");
/**
 * onclick events and "red" class if step passes single check!!!
 * EXTERNAL FUNCTION for this
 * TESTJPF
 * need a bce.html.js component
 */
export const BceButtonTemplate = (level: string, letter: string) =>
  /*html*/ `<button id="${level}${letter}Button" class="step__button">&#8675;</button>`;

export const BceTemplate = (
  level: string,
  step: [number, number],
  letter: string
) => {
  const lastLevel: boolean = isSingle(step[0], step[1]);
  return /*html*/ `
  <div
    id="${level}step${letter}"
    class="step step${letter} karat ${colorCheck(lastLevel)}"
  >
    <div class="step__label">${letter}</div>
    ${step[0]}<br />
    x ${step[1]}
    <hr />
    ${step[0] * step[1]}
   ${!lastLevel ? BceButtonTemplate(level, letter) : ""}</div>`;
};
