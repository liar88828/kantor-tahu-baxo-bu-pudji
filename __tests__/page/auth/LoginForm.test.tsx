import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Forget from "../../../src/app/(auth)/forget/page";
import LoginForm from "../../../src/app/(auth)/login/page";

// vi.fn('useActionState')
describe('auth Sign In ', async () => {

    test(" test test Sign In",
        () => {
            render(<LoginForm/>);
            expect(
                screen.getByRole("heading", { level: 2, name: "Sign In" }),
            ).toBeDefined();

        });
});
