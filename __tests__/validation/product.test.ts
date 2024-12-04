import { expect, test } from "vitest";
import { exampleProduct } from "../../src/assets/ExampleProduct";
import { ProductCreate } from "../../src/lib/validation/product.valid";

test("Product valid test", () => {
	const test = ProductCreate.parse(exampleProduct)
	expect(test).toEqual(exampleProduct)
})
