import { describe, expect, test } from "vitest"
import { toRepeat } from "../../src/utils/toRepeat";

describe('toRepeat Tests Utils', () => {

    test("toRepeat test", () => {
        const data = toRepeat(2)
        expect(data).toEqual([ 1, 2 ])
    })

    test("toRepeat test Error", () => {
        const data = toRepeat(3)
        expect(data).toEqual([ 1, 2, 3 ])
        expect(data).not.toEqual([ 0, 1, 2, 3 ])
    })

})
