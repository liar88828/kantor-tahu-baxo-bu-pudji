import { expect, test } from "vitest";
import { exampleProduct } from "../../src/assets/ExampleProduct";
import { ProductCreate } from "../../src/validation/product.valid";

test("Product valid test", () => {
    const data = ProductCreate.parse(exampleProduct)
    expect(data).toEqual(exampleProduct)
})
