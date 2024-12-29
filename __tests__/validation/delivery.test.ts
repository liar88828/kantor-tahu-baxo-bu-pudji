import { expect, test } from "vitest"
import { exampleDeliveryCreate } from "../../src/assets/ExampleDelivery"
import { DeliveryCreate } from "../../src/validation/delivery.valid"

test("Delivery valid test", () => {
    const test = DeliveryCreate.parse(exampleDeliveryCreate)
    expect(test).toEqual(exampleDeliveryCreate)
})
