import { expect, test } from "vitest";
import { DeliveryCreate } from "../../src/lib/validation/delivery.valid";
import { exampleDeliveryCreate } from "../../src/assets/ExampleDelivery";

test("Delivery valid test", () => {
	const test = DeliveryCreate.parse(exampleDeliveryCreate)
	expect(test).toEqual(exampleDeliveryCreate)
})
