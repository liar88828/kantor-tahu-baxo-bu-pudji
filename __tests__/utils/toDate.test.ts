import { describe, expect, test } from "vitest"
import { toDate, toDateIndo } from "../../src/utils/toDate";

describe('toDate Tests Utils', () => {

    test("toDate test", () => {
        const dateTest = new Date("2024-12-04T15:30:00Z")
        const data = toDate(dateTest)
        expect(data).toEqual('04/12/2024')
    })

    test("toDateIndo test", () => {
        const dateTest = new Date("2024-12-04T15:30:00Z")
        const data = toDateIndo(dateTest)
        expect(data).toEqual('Rabu, 04 Desember 2024')
    })

})
