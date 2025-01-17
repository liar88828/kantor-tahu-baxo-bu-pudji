import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileUserPage } from "../../src/app/components/profile/profile.page";
import { userExampleComplete } from "../../src/assets/user.example";

describe('profile Test Components', async () => {

    test("ProfileUserPage test",
        () => {
            render(<ProfileUserPage
                user={ userExampleComplete }>
                <h1>Hello Test</h1>
            </ProfileUserPage>);
            expect(screen.getByRole("heading", { level: 1, name: "Hello Test" })).toBeDefined();
            expect(screen.getByRole("heading", { level: 2, name: "John Doe" })).toBeDefined();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

        });
});
