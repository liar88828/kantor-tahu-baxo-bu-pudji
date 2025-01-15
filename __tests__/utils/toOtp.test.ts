import { describe, expect, test } from "vitest"
import { toOtp } from "../../src/utils/toOtp";

describe('toOtp Tests Utils', () => {

    test("toOtp test number", () => {
        const data = toOtp({ length: 6 })
        expect(data.split('')).toHaveLength(6)
    })

    test.skip("toOtp test Error", () => {
        const data = toOtp({
            length: 6,
            includeAlphabets: true,
            includeDigits: true,
        })
        expect(data).toEqual([ 1, 2, 3 ])
        expect(data).not.toEqual([ 0, 1, 2, 3 ])
    })

})
