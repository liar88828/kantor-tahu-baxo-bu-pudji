import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Forget from "../../../src/app/(auth)/forget/page";

// vi.fn('useActionState')
describe('auth  ', async () => {

    test(" test test",
        () => {
            render(<Forget/>);
            expect(
                screen.getByRole("heading", { level: 2, name: "Forget" }),
            ).toBeDefined();

        });
});
