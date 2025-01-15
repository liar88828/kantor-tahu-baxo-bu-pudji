import { describe, expect, test } from "vitest"
import { subTotal } from "../../src/utils/toCalculate";
import { TrolleyExample } from "../../src/assets/ExampleOrder";

describe('toCalculate Tests Utils', () => {

    test("subTotal test", () => {
        const data = subTotal(TrolleyExample)
        expect(data).toEqual(40000)
    })

})
