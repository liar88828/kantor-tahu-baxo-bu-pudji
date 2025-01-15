import { describe, test } from "vitest"
import { orderSanitize } from "../../src/sanitize/order.sanitize";
import { dataOrderTransaction } from "../../src/assets/ExampleOrder";

describe('Order Sanitize Tests Utils', () => {

    test.skip("orderSanitize test", () => {
        const data = orderSanitize(dataOrderTransaction)
        console.log(data)
        // expect(data).toEqual( {})
    })

})
