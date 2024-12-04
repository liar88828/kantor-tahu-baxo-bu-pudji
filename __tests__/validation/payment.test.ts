import { expect, test } from "vitest";
import { examplePayment } from "../../src/assets/ExamplePayment";
import { PaymentCreate } from "../../src/lib/validation/payment.valid";

test("Payment valid test", () => {
	const test = PaymentCreate.parse(examplePayment)
	expect(test).toEqual(examplePayment)
})
