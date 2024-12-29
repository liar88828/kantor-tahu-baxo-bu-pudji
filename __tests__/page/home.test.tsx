import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/app/page";

describe('test home page ', async () => {

    test("App Router: Works with dynamic route segments",
        async () => {
            render(await HomePage());
            expect(
                screen.getByRole("heading", { level: 1, name: "Discover the Delicious World of Tahu Bakso" }),
            ).toBeDefined();

        });

    test("show text",
        async () => {
            render(await HomePage());

            expect(
                screen.getByText("Jalan Raya Bandung No. 123, Indonesia"),
            ).toBeInTheDocument();
        });

})
