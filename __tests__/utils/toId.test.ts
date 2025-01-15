import { describe, expect, test } from "vitest"
import { setIdBank, setIdDelivery, setIdProduct } from "../../src/utils/toId";
import { exampleDelivery } from "../../src/assets/ExampleDelivery";
import { exampleProduct } from "../../src/assets/ExampleProduct";
import { examplePayment } from "../../src/assets/ExamplePayment";

describe('ToId Tests Utils', () => {

    test("setIdDelivery test", () => {

        const data = setIdDelivery(exampleDelivery)
        const testText = data.split('1').shift()
        expect(testText).toContain('ko_ko_ko_ko_ko_')
    })

    test("setIdProduct test", () => {
        const data = setIdProduct(exampleProduct)
        const testText = data.split('1').shift()
        expect(testText).toContain('Wi_99_Wa_El_A _')
    })

    test("setIdBank test", () => {
        const data = setIdBank(examplePayment)
        const testText = data.split('1').shift()
        expect(testText).toContain('Jo_Tr_+6_')
    })

})
