import { Application } from "@hotwired/stimulus";
import KaratsubaController from "../controllers/karatsuba_controller";

const application = Application.start();
application.register("karatsuba", KaratsubaController);

test("multiplies 2531 + 1467 to equal 3712977", () => {
  expect(KaratsubaController.calculate(null, [2531, 1467], 0, null)).toBe(
    "3712977"
  );
});
